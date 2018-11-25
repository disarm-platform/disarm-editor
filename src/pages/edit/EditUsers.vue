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
          <div>{{scope.column.label}}</div>
          <el-button type="text" @click="set_all_for_permission(scope)">All</el-button>
          |
          <el-button type="text" @click="set_none_for_permission(scope)">None</el-button>
        </template>
        <template slot-scope="scope">

          <el-checkbox
            :checked="scope.row.permissions[scope.column.label]"
            @change="toggle(scope)"
          />
        </template>
      </el-table-column>
      s
    </el-table>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {DevBasicUser, InstanceConfig, Permission, DevUserWithPermissions} from '@/types';

  // DEV/DEBUG ONLY
  import {sample_users, sample_permissions, sample_applets} from './sampleUsers';
  import {
    bulk_set_for_permission,
    bulk_set_for_user, toggle_permission,
    users_and_permissions_for_table
  } from "@/lib/users_with_permissions"


  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        users: sample_users as DevBasicUser[],
        permissions: sample_permissions as Permission[],
      };
    },
    computed: {
      permission_options(): string[] {
        const output = [];

        const types = ['write', 'read'];
        // const applet_names: string[] = Object.keys(this.live_instance_config.applets);
        const applet_names: string[] = Object.keys(sample_applets);

        applet_names.forEach((applet) => {
          types.forEach((type) => {
            output.push(`${type}:${applet}`);
          });
        });
        return output;
      },
      users_with_permissions(): DevUserWithPermissions[] {
        return users_and_permissions_for_table(this.users, this.permissions, this.permission_options)
      },
    },
    mounted() {
    },
    methods: {
      toggle(scope: object) {
        const user_id = scope.row._id;
        const permission = scope.column.label;
        toggle_permission(scope, this.permissions, user_id, permission);
      },
      set_all_for_user(scope: object) {
        const user_id = scope.row._id;
        bulk_set_for_user(this.permissions, user_id, true, this.permission_options);
      },
      set_none_for_user(scope: object) {
        const user_id = scope.row._id;
        bulk_set_for_user(this.permissions, user_id, false, this.permission_options);
      },
      set_all_for_permission(scope: object) {
        const permission_string = scope.column.label;
        const value = true;
        bulk_set_for_permission(this.users_with_permissions, permission_string, value);
      },
      set_none_for_permission(scope: object) {
        const permission_string = scope.column.label;
        const value = false;
        bulk_set_for_permission(this.users_with_permissions, permission_string, value);
      },
      save() {
        console.log(this.permissions)
      },
    },
  });
</script>

<style lang='scss' scoped>
</style>
