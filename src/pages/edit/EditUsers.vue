<template>
  <div>
    <el-button @click='upload_changes' type="primary" size="mini">Upload changes</el-button>

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

    <el-button @click='add_user' size="mini">add user</el-button>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {DevBasicUser} from '@/types';
import {USERS_MUTATIONS} from '@/store/users';

export default Vue.extend({
  computed: {
    users(): any { return this.$store.state.users_module.users; },
  },
  methods: {
    add_user() {
      // TODO: @refac to separate file, don't create models in here
      const new_user = {
        name: 'No-one',
        username: 'No name',
        _id: null,
      } as DevBasicUser;

      this.$store.commit(USERS_MUTATIONS.ADD_USER, new_user);
    },
    edit_name(scope: any) {
      const updated_user = {};
      console.log('update_user', updated_user);
    },
    reset_password(scope: any) {
      const updated_user = {};
      console.log('update_user', updated_user);
    },
    delete_user(scope: any) {
      console.log('delete_user');
    },
    upload_changes() {
      console.log('[UPLOAD]', this.users);
    },
  },
});
</script>

<style lang='scss' scoped>

</style>