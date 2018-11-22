<template>
  <el-container>
    <el-header>
      <h2 style="float:left">DiSARM registry-client</h2>

      <LoggedInStatus></LoggedInStatus>

    </el-header>

    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  import LoggedInStatus from '@/components/LoggedInStatus.vue';

  export default Vue.extend({
    components: {LoggedInStatus},
  });
</script>

<style>
  html, body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
