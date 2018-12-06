<template>
  <div v-if="live_instance_config">
    <el-button @click="upload_changes" type="primary" size="mini">Upload changes</el-button>

    <el-table ref="multipleTable" :data="users_with_permissions" style="width: 100%" size="mini">
      <el-table-column property="username" fixed label="Username" width="100"></el-table-column>

      <el-table-column label="Bulk">
        <template slot-scope="scope">
          <el-button type="text" @click="set_all_for_user_scope(scope)" style="margin: 0px;">All</el-button>|
          <el-button type="text" @click="set_none_for_user_scope(scope)" style="margin: 0px;">None</el-button>
        </template>
      </el-table-column>

      <el-table-column
        v-for="permission in permission_options"
        :key="permission.text"
        :property="permission.text"
        :label="permission.text"
        with="500"
      >
        <!--PERMISSION COL HEADER -->
        <template slot="header" slot-scope="scope">
          <div>
            <em>{{permission.type}}</em>
            :{{permission.subtype}}
          </div>
          <div class="actions">
            <el-button type="text" @click="set_all_for_permission(scope)">All</el-button>|
            <el-button type="text" @click="set_none_for_permission(scope)">None</el-button>
          </div>
        </template>

        <!-- PERMISSION CELL -->
        <template slot-scope="scope">
          <span @click="toggle(scope)" class="clickable">
            <i v-if="scope.row.permissions[scope.column.property]" class="active el-icon-success"></i>
            <i v-else class="inactive el-icon-circle-plus-outline"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <AddUserToInstance @add_user="add_user_to_instance" :users="addable_users"></AddUserToInstance>
  </div>

  <div v-else>Config is either invalid or empty. Try filling it up.</div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { get, without } from 'lodash';

import AddUserToInstance from './AddUserToInstance.vue';
import COMMON from '@/lib/common';

import {
  DevBasicUser,
  InstanceConfig,
  Permission,
  DevUserWithPermissions,
} from '@/types';

import {
  bulk_set_permission_for_all_users,
  bulk_set_all_permissions_for_user,
  toggle_permission,
  users_and_permissions_for_table,
} from '@/lib/users_with_permissions';
import { USERS_ACTIONS, USERS_MUTATIONS } from '../../../store/users';

interface PermissionOption {
  text: string;
  type: string;
  subtype: string;
}

export default Vue.extend({
  components: {AddUserToInstance},
  computed: {
    live_instance_config(): InstanceConfig {
      return this.$store.state.config_module.live_instance_config;
    },
    users(): DevBasicUser[] {
      return this.$store.state.users_module.users;
    },
    permissions(): Permission[] {
      return this.$store.state.users_module.permissions;
    },
    permission_options(): PermissionOption[] {
      const output: PermissionOption[] = [];

      const types = ['write', 'read'];
      const applet_names: string[] = Object.keys(
        get(this.live_instance_config, 'applets', {}),
      );
      const applet_names_without_meta = without(applet_names, 'meta');

      applet_names_without_meta.forEach((applet) => {
        types.forEach((type) => {
          const new_option: PermissionOption = {
            text: `${type}:${applet}`,
            type,
            subtype: applet,
          };
          output.push(new_option);
        });
      });
      return output;
    },
    permission_options_strings(): string[] {
      return this.permission_options.map(
        (permission_option: PermissionOption) => {
          return permission_option.text;
        },
      );
    },
    users_with_permissions(): DevUserWithPermissions[] {
      return users_and_permissions_for_table(
        this.users,
        this.permissions,
        this.permission_options_strings,
      );
    },
    addable_users(): DevBasicUser[] {
      // of all users find those not currently in table (users_with_permissions),
      const user_ids_in_table = this.users_with_permissions.map((u) => u._id);

      return this.users.filter((user: DevBasicUser) => {
        return !user_ids_in_table.includes(user._id);
      });
    },
  },
  methods: {
    toggle(scope: any) {
      const user_id = scope.row._id;
      const permission = scope.column.property;
      const updated_permissions = toggle_permission(
        scope,
        this.permissions,
        user_id,
        permission,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    set_all_for_user_scope(scope: any) {
      const user_id = scope.row._id;
      this.set_all_for_user_id(user_id);
    },
    set_all_for_user_id(user_id: string) {
      const updated_permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        true,
        this.permission_options_strings,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    set_none_for_user_scope(scope: any) {
      const user_id = scope.row._id;
      this.set_none_for_user_id(user_id);
    },
    set_none_for_user_id(user_id: string) {
      const updated_permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        false,
        this.permission_options_strings,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    set_all_for_permission(scope: any) {
      const permission_string = scope.column.property;
      const value = true;
      const updated_permissions = bulk_set_permission_for_all_users(
        this.permissions,
        this.users,
        permission_string,
        value,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    set_none_for_permission(scope: any) {
      const permission_string = scope.column.property;
      const value = false;
      const updated_permissions = bulk_set_permission_for_all_users(
        this.permissions,
        this.users,
        permission_string,
        value,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    reload() {
      this.$emit('reload', 'permissions');
    },
    update_permissions(permissions: Permission[]) {
      this.$store.commit(USERS_MUTATIONS.SET_PERMISSIONS, permissions);
    },
    async upload_changes() {
      await this.$store.dispatch(
        USERS_ACTIONS.UPDATE_PERMISSIONS,
      );
    },
    add_user_with_empty_permissions(user: DevBasicUser) {
      if (user._id) {
        const additional_permissions: Permission[] = [
          {
            user_id: user._id,
            instance_id: this.live_instance_config.instance_id,
            value: COMMON.permissions.dummy_record_value,
          },
        ];
        const joined_permissions = this.permissions.concat(
          additional_permissions,
        );
        this.update_permissions(joined_permissions);
      }
    },
    add_user_to_instance(user: DevBasicUser) {
      this.add_user_with_empty_permissions(user);
    },
  },
});
</script>

<style lang='scss' scoped>
.clickable {
  cursor: pointer;
  font-size: 14px;

  .active {
    color: #2cd02c;
  }

  .inactive {
    color: darkgrey;
  }
}

.actions {
  button {
    margin: 0px;
  }
}
</style>
