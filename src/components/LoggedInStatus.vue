<template>
  <span v-if="user" style="float:right; margin-top: 10px;">
    {{user.username}} |
    <router-link :to="{name: 'logout'}">Logout</router-link>
  </span>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {LoggedInUser, ROOT_MUTATIONS} from '../store';

  export default Vue.extend({
    computed: {
      user(): LoggedInUser { return this.$store.state.logged_in_user; },
    },
  });
</script>

<style scoped>

</style>