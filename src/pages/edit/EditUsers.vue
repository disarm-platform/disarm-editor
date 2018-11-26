<template>
  <div>
    <el-button @click='save'>save table</el-button>

    <el-table
        ref="multipleTable"
        :data="users_with_permissions"
        style="width: 100%"
    >
      <el-table-column
          property="username"
          fixed
          label="Name"
          width="100">
        <template slot-scope="scope">
          <span @click="edit_name(scope)">{{scope.row[scope.column.property]}}</span>
        </template>
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
        <template slot="header" slot-scope="scope">
          <div>{{scope.column.property}}</div>
          <el-button type="text" @click="set_all_for_permission(scope)">All</el-button>
          |
          <el-button type="text" @click="set_none_for_permission(scope)">None</el-button>
        </template>
        <template slot-scope="scope">
          <span
              @click="toggle(scope)"
              class="clickable"
          >
            <i v-if="scope.row.permissions[scope.column.property]" class="el-icon-success green"></i>
            <i v-else class="el-icon-circle-plus-outline"></i>
          </span>
        </template>
      </el-table-column>
      s
    </el-table>

    <el-button @click='add_user'>add user</el-button>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {
  DevBasicUser,
  InstanceConfig,
  Permission,
  DevUserWithPermissions,
} from '@/types';

// DEV/DEBUG ONLY
import {
  sample_users,
  sample_permissions,
  sample_applets,
} from '../seedData';
import {
  bulk_set_permission_for_all_users,
  bulk_set_all_permissions_for_user,
  toggle_permission,
  users_and_permissions_for_table,
} from '@/lib/users_with_permissions';

export default Vue.extend({
  props: {
    live_instance_config: Object as () => InstanceConfig,
    users: Array as () => DevBasicUser[],
    permissions: Array as () => Permission[],
  },
  computed: {
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
    isChecked(scope: any) {
      return scope.row.permissions[scope.column.property];
    },
    toggle(scope: any) {
      const user_id = scope.row._id;
      const permission = scope.column.property;
      toggle_permission(scope, this.permissions, user_id, permission);
    },
    set_all_for_user(scope: any) {
      const user_id = scope.row._id;
      this.permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        true,
        this.permission_options,
      );
    },
    set_none_for_user(scope: any) {
      const user_id = scope.row._id;
      this.permissions = bulk_set_all_permissions_for_user(
        this.permissions,
        user_id,
        false,
        this.permission_options,
      );
    },
    set_all_for_permission(scope: any) {
      const permission_string = scope.column.property;
      const value = true;
      this.permissions = bulk_set_permission_for_all_users(
        this.permissions,
        this.users,
        permission_string,
        value,
      );
    },
    set_none_for_permission(scope: any) {
      const permission_string = scope.column.property;
      const value = false;
      this.permissions = bulk_set_permission_for_all_users(
        this.permissions,
        this.users,
        permission_string,
        value,
      );
    },
    add_user() {
      const new_user = {
        name: 'No-one',
        username: 'No name',
        _id: `${Math.random()}`,
      } as DevBasicUser;

      console.log('Using Math.random() for user._id');
      this.users.push(new_user);
    },
    edit_name(scope: any) {
      console.log('edit_name for', scope.row[scope.column.property]);
    },
    save() {
      console.log(this.permissions);
    },
  },
});
</script>

<style lang='scss' scoped>
  .clickable {
    cursor: pointer;
  }
  .green {
    color: #2cd02c;
  }
</style>
