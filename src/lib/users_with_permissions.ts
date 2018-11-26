import Vue from 'vue';

import {DevBasicUser, DevUserWithPermissions, FlatPermissionsRow, Permission} from '@/types';

//
// CREATE
//

function create_all_permissions_for_user(
  permission_options: string[],
  permissions: Permission[],
  user_id: string) {
  return permission_options.reduce((acc, permission_string) => {
    acc[permission_string] = permission_exists_for_user_id(permissions, user_id, permission_string);
    return acc;
  }, {} as FlatPermissionsRow);
}

function permission_exists_for_user_id(permissions: Permission[], user_id: string, permission_string: string) {
  if (!(permissions && permissions.length)) { return false; }

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

function users_and_permissions_for_table(
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

function add_permission(permissions: Permission[], user_id: string, permission_type: string) {
  const index = existing_index(permissions, user_id, permission_type);
  // if found do nothing
  if (index !== -1) {
    return;
  } else {
    // else add
    const new_permission = {
      user_id,
      value: permission_type,
    } as Permission;
    permissions.push(new_permission);
  }
}

function remove_permission(permissions: Permission[], user_id: string, permission_type: string) {
  const index = existing_index(permissions, user_id, permission_type);

  // if found remove
  if (index !== -1) {
    permissions.splice(index, 1);
  } else {
    throw new Error(`Cannot find permission ${permission_type} for user_id ${user_id} at index ${index} from ${permissions}`);
  }
}

function toggle_permission(scope: any, permissions: Permission[], user_id: string, permission_type: string) {
  const passed_value = scope.row.permissions[scope.column.label];

  if (passed_value === true) {
    remove_permission(permissions, user_id, permission_type);
  } else {
    add_permission(permissions, user_id, permission_type);
  }
}

//
// BULK
//

function bulk_set_for_user(
  permissions: Permission[],
  user_id: string,
  permission_value: boolean,
  permission_options: string[],
): Permission[] {

  if (permission_value) {
    // add all for user
    return [];
  } else {
    // remove all for user
    return permissions.filter((p) => p.user_id !== user_id);
  }

  // return permission_options.reduce((acc, permission_string) => {
  //   const exists_for_user = permission_exists_for_user_id(permissions, user_id, permission_string);
  //
  //   if (exists_for_user) {
  //     // Assume it must be true already - only positive permissions are stored
  //     return;
  //   } else {
  //     // set permissions as true for user
  //   }
  // }, {} as FlatPermissionsRow);

  // const users_permissions = permissions.filter(p => p.user_id === user_id);
  // if (permission_value === true) {
  //   if (users_permissions) {
  //     console.log('[bulk set]  found existing')
  //     users_permissions.forEach((p) => add_permission(permissions, user_id, p.value));
  //   } else {
  //     console.log('[bulk set]  nothing found')
  //   }
  // } else {
  //   if (users_permissions) {
  //     console.log('[bulk unset] found existing')
  //     users_permissions.forEach((p) => remove_permission(permissions, user_id, p.value));
  //   } else {
  //     console.log('[bulk unset] nothing found')
  //   }
  // }
}

function bulk_set_for_permission(
  users_with_permissions: DevUserWithPermissions[],
  permission_string: string,
  permission_value: boolean,
) {
  users_with_permissions.forEach((user, user_index) => {
    const old_user = users_with_permissions[user_index];
    const new_user = Object.assign(
      {},
      {...old_user},
    ) as DevUserWithPermissions;
    new_user.permissions[permission_string] = permission_value;
    Vue.set(users_with_permissions, user_index, new_user);
  });
}


export {
  users_and_permissions_for_table,
  toggle_permission,
  bulk_set_for_user,
  bulk_set_for_permission,
};
