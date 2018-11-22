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
  import {mapState} from 'vuex'

  export default Vue.extend({
    methods: {
      computed: {
        ...mapState({
          user: state => state.user,
        })
      },
      logout() {
        this.$store.commit(META_RESET_USER);
        this.$router.push('/');
      },
    }
  })
</script>

<style lang="scss">
  html, body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
