<template>
  <div>
    <el-alert v-if="error.length" :title="error"></el-alert>

    <el-form label-width="120px" @submit="do_login">
      <el-form-item label="Username">
        <el-input v-model="username"></el-input>
      </el-form-item>

      <el-form-item label="Password">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="do_login" @keyup.enter="do_login">Login</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {ACTIONS} from '@/store';

  interface Data {
    error: string;
    username: string;
    password: string;
  }

  export default Vue.extend({
    data() {
      return {
        error: '',
        username: 'a_user',
        password: '',
      } as Data;
    },
    methods: {
      async do_login() {
        this.error = '';
        try {
          await this.$store.dispatch(
            ACTIONS.META_LOGIN,
            {
              username: this.username,
              password: this.password,
            },
          );
          this.$router.push({name: 'home'});
        } catch (e) {
          this.error = e.message;
        }
      },
    },
  });
</script>

<style scoped>

</style>