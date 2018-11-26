<template>
  <div>
    <el-button @click="reload">Reload</el-button>
    <el-button @click='save'>Save</el-button>

    <el-table
        ref="users_table"
        :data="users"
        style="width: 100%"
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
          <el-button type="text" @click="reset_password(scope)">Reset password</el-button>
          <el-button type="danger" size="mini" @click="delete_user(scope)">Delete</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-button @click='add_user'>add user</el-button>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {DevBasicUser} from '@/types';

  export default Vue.extend({
    props: {
      users: Array as () => DevBasicUser[],
    },
    methods: {
      add_user() {
        const new_user = {
          name: 'No-one',
          username: 'No name',
          _id: `${Math.random()}`,
        } as DevBasicUser;

        console.log('Using Math.random() for user._id');
        this.$emit('add_user', new_user);
      },
      edit_name(scope: any) {
        const updated_user = {};
        this.$emit('update_user', updated_user);
      },
      reload() {
        this.$emit('reload', 'users');
      },
      reset_password(scope: any) {
        const updated_user = {};
        this.$emit('update_user', updated_user);
      },
      delete_user(scope: any) {
        this.$emit('delete_user', scope);
      },
      save() {
        console.log(this.users);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>