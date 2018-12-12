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

      <el-form-item label="API URL" v-if="ui_edit_api_url" @click="ui_edit_api_url = !ui_edit_api_url">
        <el-input type="text" v-model="updated_api_url">
          <el-button slot="append" @click="reset_api_url">Reset</el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="do_login" @keyup.enter="do_login" :disabled="username === '' || password === ''">Login</el-button>
        <el-button type="text" @click="ui_edit_api_url = !ui_edit_api_url" v-if="!ui_edit_api_url">
          Edit API URL
        </el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {ROOT_ACTIONS, ROOT_MUTATIONS} from '@/store';

  interface Data {
    error: string;
    username: string;
    password: string;
    updated_api_url: string;
    ui_edit_api_url: boolean;
  }

  export default Vue.extend({
    data() {
      return {
        error: '',
        username: '',
        password: '',
        updated_api_url: '',
        ui_edit_api_url: false,
      } as Data;
    },
    computed: {
      api_url(): string { return this.$store.state.api_url; },
    },
    mounted() {
      this.updated_api_url = this.api_url;
    },
    methods: {
      reset_api_url() {
        this.$store.commit(ROOT_MUTATIONS.RESET_API_URL);
        this.updated_api_url = this.api_url;
      },
      async do_login() {
        if (this.api_url !== this.updated_api_url) {
          this.$store.commit(ROOT_MUTATIONS.SET_API_URL, this.updated_api_url);
        }
        this.error = '';
        try {
          await this.$store.dispatch(
            ROOT_ACTIONS.LOGIN,
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