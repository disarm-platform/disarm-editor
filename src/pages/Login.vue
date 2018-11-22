<template>
  <div>
    <el-alert v-if="error.length" :title="error"></el-alert>

    <el-form label-width="120px" @submit="login">
      <el-form-item label="Username">
        <el-input v-model="meta_user.username"></el-input>
      </el-form-item>

      <el-form-item label="Password">
        <el-input type="password" v-model="meta_user.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login" @keyup.enter="login">Login</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {ACTIONS} from '@/store/meta/actions'
  import {MetaUser} from '@/store/meta/types'

  interface Data {
    error: string,
    meta_user: MetaUser,
  }

  export default Vue.extend({
    data() {
      return {
        error: '',
        meta_user: {
          username: '',
          password: '',
        },
      } as Data;
    },
    methods: {
      async do_login() {
        this.error = '';
        try {
          await this.$store.dispatch(
            ACTIONS.META_DO_LOGIN,
            this.meta_user,
          );
          this.$router.push('/');
        } catch (e) {
          this.error = e.message;
        }
      }
    }
  });
</script>

<style lang='scss' scoped>

</style>