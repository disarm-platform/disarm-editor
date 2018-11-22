<template>
  <span v-if="user" style="float:right">
    {{user.username}} |
    <el-button type="text" @click="logout">Logout</el-button>
  </span>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {LoggedInUser, MUTATIONS} from '@/store';

  export default Vue.extend({
    computed: {
      user(): LoggedInUser { return this.$store.state.logged_in_user; },
    },
    methods: {
      logout() {
        this.$store.commit(MUTATIONS.RESET_USER);
        this.$router.push({name: 'login'});
      },
    },
  });
</script>

<style scoped>

</style>