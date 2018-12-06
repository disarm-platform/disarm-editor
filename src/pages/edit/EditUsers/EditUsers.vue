<template>
  <div>
    <el-table
        ref="users_table"
        :data="users"
        style="width: 100%; margin-bottom: 20px;"
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
          label="Actions">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="delete_user(scope)">Delete</el-button>
          <el-button type="text" @click="reset_password(scope)">Reset password</el-button>
        </template>
      </el-table-column>

    </el-table>

    <CreateUser @create_new="add_user"></CreateUser>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import {generate_password} from '@/lib/generate_password';
import {DevBasicUser, NewUserWithPassword} from '@/types';
import {USERS_ACTIONS} from '@/store/users';
import CreateUser from './CreateUser.vue';

export default Vue.extend({
  components: {CreateUser},
  computed: {
    users(): any {
      return this.$store.state.users_module.users;
    },
  },
  methods: {
    async add_user(new_user: NewUserWithPassword) {
      await this.$store.dispatch(USERS_ACTIONS.CREATE_USER, new_user);
      await this.alert_password_details(new_user);
    },
    edit_name(scope: any) {
      const updated_user = {};
      console.log('update_user', updated_user);
    },
    async reset_password(scope: any) {
      const user: DevBasicUser = scope.row;
      const new_password = generate_password();
      const updated_user: NewUserWithPassword = {
        ...user,
        password: new_password,
      };
      await this.alert_password_details(updated_user);
    },
    async delete_user(scope: any) {
      const user = scope.row;
      try {
        await this.$confirm(`Delete user ${user.name}? Cannot undo.`, 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning',
        });
        await this.$store.dispatch(USERS_ACTIONS.DELETE_USER, user);
        this.$message({
          type: 'success',
          message: `Deleted ${user.name}`,
        });
      } catch (e) {
        throw e;
      }
    },
    async alert_password_details(user: NewUserWithPassword) {
      const message = `Please copy and send these details to the user: </br></br>` +
        `&nbsp;&nbsp;name: ${user.name}</br>` +
        `&nbsp;&nbsp;username: ${user.username}</br>` +
        `&nbsp;&nbsp;password: ${user.password}</br>` +
        `&nbsp;&nbsp;url: ${location.origin}</br></br>` +
        `THIS IS THE LAST TIME THE PASSWORD WILL BE VISIBLE.`;
      try {
        await this.$alert(message, 'Login details', {
          dangerouslyUseHTMLString: true,
          showClose: false,
        });
      } catch (e) {
        console.log('cancelled');
      }
    },
  },
});
</script>

<style lang='scss' scoped>

</style>