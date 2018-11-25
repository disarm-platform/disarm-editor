import Vue from 'vue';
import {without} from 'lodash';

import {DevBasicUser, Permission, PermissionsRowObject, DevUserWithPermissions} from '@/types';

function users_and_permissions_for_table(
  users: DevBasicUser[],
  permissions: Permission[],
  permission_options: string[],
): DevUserWithPermissions[] {
  const result = users.map((user: DevBasicUser): DevUserWithPermissions => {
      const user_with_perms: DevUserWithPermissions = {...user, permissions: {}};

      const user_permissions = permission_options.reduce((acc, permission_string) => {
          const exists_for_user = permissions.some((permission) => {
            return (
              permission.user_id === user_with_perms._id &&
              permission.value === permission_string
            );
          });
          acc[permission_string] = exists_for_user;
          return acc;
        }, {} as PermissionsRowObject);

      user_with_perms.permissions = user_permissions;
      return user_with_perms;
    },
  );
  return result;
}

function existing_index(permissions: Permission[], user_id: string, permission_type: string): number {
  return permissions.findIndex((p) => p.user_id === user_id && p.value === permission_type);
}

function add_permission(permissions: Permission[], user_id: string, permission_type: string) {
  const index = existing_index(permissions, user_id, permission_type);

  // if found do nothing
  if (index !== -1) {
    console.log('[add] already exists')
    return;
  } else {
    // else add
    const new_permission = {
      user_id,
      value: permission_type,
    } as Permission;
    console.log('[add] create new', new_permission);
    permissions.push(new_permission);
  }
}

function remove_permission(permissions: Permission[], user_id: string, permission_type: string) {
  const index = existing_index(permissions, user_id, permission_type);

  // if found remove
  if (index !== -1) {
    console.log('[remove] found and remove', index);
    permissions.splice(index, 1);
  } else {
    console.log('[remove] but not found...')
    debugger
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

function bulk_set_for_user(
  permissions: Permission[],
  user_id: string,
  permission_value: boolean,
  permission_options: string[],
) {
  if (permission_value == true) {
    const existing_names = permissions.map((p) => p.user_id === user_id ? p.value : null).map((p) => p);
    const need_to_create = without(permission_options, existing_names);
    console.log(need_to_create);
  } else {
    permissions.splice(0, permissions.length);
  }
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
