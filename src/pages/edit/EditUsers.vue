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
        console.log('edit_name for', scope.row[scope.column.property]);
      },
      reload() {
        this.$emit('reload', 'users');
      },
      save() {
        console.log(this.users);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>