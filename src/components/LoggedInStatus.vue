<template>
  <span v-if="user" style="float:right">
    {{user.username}} |
    <el-button @click="$router.push({name: 'logout'})" type="text">Logout</el-button>
  </span>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {LoggedInUser, MUTATIONS} from '../store';

  export default Vue.extend({
    computed: {
      user(): LoggedInUser { return this.$store.state.logged_in_user; },
    },
  });
</script>

<style scoped>

</style>