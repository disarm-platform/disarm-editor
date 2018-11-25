<template>
  <div>
    <el-button @click='save'>save table</el-button>

    <el-table
        ref="multipleTable"
        :data="users_with_permissions"
        @select="onchange"
        style="width: 100%"
    >
      <el-table-column
          property="username"
          fixed
          label="Name"
          width="100">
      </el-table-column>
      <el-table-column
          v-for="(permission) in permission_options"
          v-bind:key="permission"
          :property="permission"
          :label="permission"
          with="500"
      >
        <template slot-scope="scope">
          <el-checkbox
              v-model="scope.row.permissions[scope.column.label]"
              @change="onchange(scope.row,scope.column)"
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
    permissions: {}[];
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
        const perm_options = this.permission_options;

        const result = sample_users.map((u: DevBasicUser): UserWithPermissions => {
          const user_with_perms: UserWithPermissions = {...u, permissions: []};
          const user_permissions = perm_options.forEach((p) => {
            const exists_for_user = sample_permissions.some((permission) => {
              return permission.user_id === user_with_perms._id && permission.value === p
            });
            user_with_perms.permissions[p] = exists_for_user;
          });

          return user_with_perms;
        });
        this.users_with_permissions = result;
      },
      combine_users_and_permissions(users: DevBasicUser[], permissions: Permission[]): UserWithPermissions[] {
        return null
      },
      handle_change(scope) {
        const {row, column} = scope;
        if (this.checked(scope)) {
          //remove
          const index = this.permissions.findIndex(
            (p) => p.user_id === row._id && p.value === column.property
          );
          this.permissions.splice(index, 1);
        } else {
          //Add and if its a write add the read as well

          this.permissions.push({user_id: row._id, value: column.property});
          if (column.property.startsWith('write:')) {
            this.permissions.push({
              user_id: row._id,
              value: column.property.replace('write', 'read'),
            });
          }
        }
      },
      onchange(a, b, c) {
        console.log(a, b, c);
        const index = this.users_with_permissions.findIndex((u) => u._id === a._id);
        this.$set(this.users_with_permissions, index, a);
      },
      checked(scope) {
        const {row, column} = scope;

        return this.permissions.some(
          (p) => p.user_id === row._id && p.value === column.property
        );
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
