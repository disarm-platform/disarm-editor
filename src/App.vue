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
  import {mapGetters, mapState} from 'vuex';

  import {MUTATIONS} from '@/store/meta/mutations';
  import {GETTERS} from '@/store/meta/getters';

  export default Vue.extend({
    computed: {
      ...mapGetters({
        user: GETTERS.META_USER,
      }),
    },
    methods: {
      logout() {
        this.$store.commit(MUTATIONS.APP_RESET_USER);
        this.$router.push('/');
      },
    },
  });
</script>

<style>
  html, body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
