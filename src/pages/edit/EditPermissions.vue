<template>
  <div v-if="live_instance_config">
    <el-button @click='upload_changes' type="primary" size="mini">Upload changes</el-button>

    <el-table
        ref="multipleTable"
        :data="users_with_permissions"
        style="width: 100%"
        size="mini"
    >

      <el-table-column
          property="username"
          fixed
          label="Username"
          width="100">
      </el-table-column>

      <el-table-column
          property="name"
          fixed
          label="Name"
          width="100">
      </el-table-column>

      <el-table-column
          label="All | None">
        <template slot-scope="scope">
          <el-button type="text" @click="set_all_for_user(scope)">All</el-button>
          |
          <el-button type="text" @click="set_none_for_user(scope)">None</el-button>
        </template>
      </el-table-column>

      <el-table-column
          v-for="(permission) in permission_options"
          v-bind:key="permission"
          :property="permission"
          :label="permission"
          with="500"
      >
        <!--PERMISSION COL HEADER -->
        <template slot="header" slot-scope="scope">
          <div>{{scope.column.property}}</div>
          <div>
            <el-button type="text" @click="set_all_for_permission(scope)">All</el-button>
            |
            <el-button type="text" @click="set_none_for_permission(scope)">None</el-button>
          </div>
        </template>

        <!-- PERMISSION CELL -->
        <template slot-scope="scope">
          <span
              @click="toggle(scope)"
              class="clickable"
          >
            <i v-if="scope.row.permissions[scope.column.property]" class="active el-icon-success"></i>
            <i v-else class="inactive el-icon-circle-plus-outline"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>


  </div>

  <div v-else>Config is either invalid or empty. Try filling it up.</div>
</template>

<script lang='ts'>
import Vue from 'vue';
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
import {USERS_ACTIONS, USERS_MUTATIONS} from '@/store/users';

export default Vue.extend({
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
    permission_options(): string[] {
      const output: string[] = [];

      const types = ['write', 'read'];
      const applet_names: string[] = Object.keys(this.live_instance_config.applets);

      applet_names.forEach((applet) => {
        types.forEach((type) => {
          output.push(`${type}:${applet}`);
        });
      });
      return output;
    },
    users_with_permissions(): DevUserWithPermissions[] {
      return users_and_permissions_for_table(
        this.users,
        this.permissions,
        this.permission_options,
      );
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
    set_all_for_user(scope: any) {
      const user_id = scope.row._id;
      const updated_permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        true,
        this.permission_options,
        this.live_instance_config,
      );
      this.update_permissions(updated_permissions);
    },
    set_none_for_user(scope: any) {
      const user_id = scope.row._id;
      const updated_permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        false,
        this.permission_options,
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
      await this.$store.dispatch(USERS_ACTIONS.UPDATE_PERMISSIONS, this.permissions);
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
</style>
