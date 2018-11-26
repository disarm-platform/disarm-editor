import Vue from 'vue';
import {without} from 'lodash';

import {DevBasicUser, DevUserWithPermissions, FlatPermissionsRow, Permission} from '@/types';

//
// CREATE
//

function create_all_permissions_for_user(
  permission_options: string[],
  permissions: Permission[],
  user_id: string,
): FlatPermissionsRow {
  return permission_options.reduce((acc, permission_string) => {
    acc[permission_string] = permission_exists_for_user_id(permissions, user_id, permission_string);
    return acc;
  }, {} as FlatPermissionsRow);
}

function permission_exists_for_user_id(
  permissions: Permission[],
  user_id: string,
  permission_string: string,
): boolean {
  if (!(permissions && permissions.length)) {
    return false;
  }

  return permissions.some((permission) => {
    return (
      permission.user_id === user_id &&
      permission.value === permission_string
    );
  });
}

function get_permission_for_user(permissions: Permission[], user_id: string, permission_string: string) {
  return permissions.filter((p) => p.user_id === user_id && p.value === permission_string);
}

export function users_and_permissions_for_table(
  users: DevBasicUser[],
  permissions: Permission[],
  permission_options: string[],
): DevUserWithPermissions[] {
  return users.map((user: DevBasicUser): DevUserWithPermissions => {
      const user_with_perms: DevUserWithPermissions = {...user, permissions: {}};
      if (!user._id) {
        console.log('no _id for user', user);
        return user_with_perms;
      }
      user_with_perms.permissions = create_all_permissions_for_user(permission_options, permissions, user._id);
      return user_with_perms;
    },
  );
}


//
// UPDATE
//

function existing_index(permissions: Permission[], user_id: string, permission_type: string): number {
  return permissions.findIndex((p) => p.user_id === user_id && p.value === permission_type);
}

function add_permission(
  permissions: Permission[],
  user_id: string,
  permission_type: string,
): Permission[] {
  const index = existing_index(permissions, user_id, permission_type);
  // if found do nothing
  if (index !== -1) {
  } else {
    // else add
    const new_permission = {
      user_id,
      value: permission_type,
    } as Permission;
    permissions.push(new_permission);
  }
  return permissions;
}

function remove_permission(
  permissions: Permission[],
  user_id: string,
  permission_type: string,
): Permission[] {
  const index = existing_index(permissions, user_id, permission_type);

  // if found remove
  if (index !== -1) {
    permissions.splice(index, 1);
    return permissions;
  } else {
    throw new Error(
      `Cannot find permission ${permission_type} for` +
      `user_id ${user_id} at index ${index} from ${permissions}`,
    );
  }
}

export function toggle_permission(
  scope: any,
  permissions: Permission[],
  user_id: string,
  permission_type: string,
): Permission[] {
  const passed_value = scope.row.permissions[scope.column.property];
  const permissions_copy = permissions.slice(0);

  if (passed_value === true) {
    return remove_permission(permissions_copy, user_id, permission_type);
  } else {
    return add_permission(permissions_copy, user_id, permission_type);
  }
}

//
// BULK
//

export function bulk_set_all_permissions_for_user(
  permissions: Permission[],
  user_id: string,
  permission_value: boolean,
  permission_options: string[],
): Permission[] {

  const permissions_copy = permissions.slice(0);

  if (permission_value === true) {
    // add all for user, except if existing
    const existing_types = permissions_copy.filter((p) => p.user_id === user_id).map((p) => p.value);
    const missing_types = without(permission_options, ...existing_types);
    const add_these: Permission[] = missing_types.reduce((acc: Permission[], permission_string: string) => {
      const permission = {
        user_id,
        value: permission_string,
      };
      acc.push(permission);
      return acc;
    }, []);
    return permissions_copy.concat(add_these);
  } else {
    // remove all for user
    return permissions_copy.filter((p) => p.user_id !== user_id);
  }
}

export function bulk_set_permission_for_all_users(
  permissions: Permission[],
  users: DevBasicUser[],
  permission_string: string,
  permission_value: boolean,
): Permission[] {
  const permissions_copy = permissions.slice(0);

  if (permission_value === true) {
    // add permission_string for all users, except if existing
    const all_user_ids = users.map((u) => u._id) as string[];
    const user_ids_with_this_permission: string[] = permissions_copy
      .filter((p) => p.value === permission_string)
      .map((p) => p.user_id);
    const missing_user_ids = without(all_user_ids, ...user_ids_with_this_permission);
    const add_these: Permission[] = missing_user_ids.reduce((acc: Permission[], user_id) => {
      const permission = {
        user_id,
        value: permission_string,
      };
      acc.push(permission);
      return acc;
    }, []);
    return permissions_copy.concat(add_these);
  } else {
    // remove permission_string for all users
    return permissions_copy.filter((p) => p.value !== permission_string);
  }
}

