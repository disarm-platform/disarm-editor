<template>
  <el-container>
    <el-header>
      <h2 style="float:left">DiSARM registry-client</h2>

      <span v-if="user" style="float:right">
        {{user.username}} |
        <el-button type="text" @click="logout">Logout</el-button>
      </span>

    </el-header>

    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  import {LoggedInUser, MUTATIONS} from '@/store';

  export default Vue.extend({
    computed: {
      user(): LoggedInUser { return this.$store.state.logged_in_user; },
    },
    methods: {
      logout() {
        console.log('user before logout', this.user);
        this.$store.commit(MUTATIONS.RESET_USER);
        console.log('user after logout', this.user);
        this.$router.push({name: 'home'});
      },
    },
  });
</script>

<style>
  html, body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
