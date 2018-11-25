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
          <el-button type="text" @click="set_all_for_user(scope)">All</el-button> |
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
          <el-button type="text" @click="set_all_for_permission(scope)">All</el-button> |
          <el-button type="text" @click="set_none_for_permission(scope)">None</el-button>
        </template>
        <template slot-scope="scope">

          <el-checkbox
            v-model="scope.row.permissions[scope.column.label]"
          />
        </template>
      </el-table-column>
      s
    </el-table>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import config_schema_json_1 from '@locational/config-validation/build/module/config_schema.json';
  import {Applets, DoumaUser, Permission} from '@/types';

  interface DevBasicUser { // This is just for dev, need to use DoumaUser
    _id?: string;
    name: string;
    username: string;
  }

  interface UserWithPermissions extends DevBasicUser {
    permissions: {};
  }

  const sample_users = [
    {
      _id: '1',
      name: 'Sihle',
      username: 'sm',
    },
    {
      _id: '2',
      name: 'Thokozani',
      username: 'tn',
    },
    {
      _id: '3',
      name: 'Bob',
      username: 'bob',
    },
  ];

  const sample_permissions = [
    {
      _id: '0',
      user_id: '3',
      instance_id: '1',
      value: 'write:irs_monitor',
    },
  ] as Permission[];

  const sample_applets = {irs_monitor: {}, irs_plan: {}};

  export default Vue.extend({
    data() {
      return {
        users: sample_users as DevBasicUser[],
        permissions: sample_permissions as Permission[],
        applets: sample_applets as Applets,
        users_with_permissions: [] as UserWithPermissions[],
      };
    },
    computed: {
      permission_options(): string[] {
        const output: string[] = [];

        const types = ['write', 'read'];
        const applet_names: string[] = Object.keys(this.applets);

        applet_names.forEach((applet) => {
          types.forEach((type) => {
            output.push(`${type}:${applet}`)
          })
        });
        return output;
      },
    },
    mounted() {
      this.setup_sample_data();
    },
    methods: {
      setup_sample_data() {

        const result = sample_users.map((u: DevBasicUser): UserWithPermissions => {
          const user_with_perms: UserWithPermissions = {...u, permissions: []};

          const user_permissions = this.permission_options.reduce((acc, permission_string) => {
            const exists_for_user = sample_permissions.some((permission) => {
              return permission.user_id === user_with_perms._id && permission.value === permission_string
            });
            acc[permission_string] = exists_for_user;
            return acc;
          }, {});

          user_with_perms.permissions = user_permissions;
          return user_with_perms;
        });
        this.users_with_permissions = result;
      },
      matrix_users_and_permissions(users: DevBasicUser[], permissions: Permission[]): UserWithPermissions[] {

        return null
      },
      toggle_permission(scope) {
        this.$set(scope.row.permissions, scope.column.label, !scope.row.permissions[scope.column.label]);
      },
      set_for_user(user_index: number, permission_value: boolean) {
        const old_user = this.users_with_permissions[user_index];
        const new_user = Object.assign({}, {...old_user}) as UserWithPermissions;
        const new_permissions = this.permission_options.reduce((acc, option) => {
          acc[option] = permission_value;
          return acc
        }, {});
        new_user.permissions = new_permissions;
        this.$set(this.users_with_permissions, user_index, new_user);
      },
      set_all_for_user(scope) {
        const index = scope.$index;
        this.set_for_user(index, true);
      },
      set_none_for_user(scope) {
        const index = scope.$index;
        this.set_for_user(index, false);
      },
      set_for_permission(permission_string: string, permission_value: boolean) {
        this.users_with_permissions.forEach((user, user_index) => {
          const old_user = this.users_with_permissions[user_index];
          const new_user = Object.assign({}, {...old_user}) as UserWithPermissions;
          new_user.permissions[permission_string] = permission_value;
          this.$set(this.users_with_permissions, user_index, new_user);
        });
      },
      set_all_for_permission(scope) {
        const permission_string = scope.column.label;
        const value = true;
        this.set_for_permission(permission_string, value)
      },
      set_none_for_permission(scope) {
        const permission_string = scope.column.label;
        const value = false;
        this.set_for_permission(permission_string, value)
      },
      save() {
        // split up permissions
        const result = this.users_with_permissions.reduce((acc, u) => {
          const got_there = Object.keys(u.permissions).filter(
            (p) => u.permissions[p]
          );
          const rebuilt = got_there.map((p) => {
            return {
              user_id: u._id,
              value: p,
            };
          });
          acc = [...acc, ...rebuilt];
          console.log('rebuilt, acc', rebuilt, acc);
          return acc;
        }, []);
        console.log(result);
      },
    },
  });
</script>

<style lang='scss' scoped>
</style>
