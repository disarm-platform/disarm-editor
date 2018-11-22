<template>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {ACTIONS} from '@/store';

  export default Vue.extend({
    async mounted() {
      await this.$store.dispatch(ACTIONS.LOGOUT);
      this.$router.push({name: 'login'});
    },
  });
</script>

<style scoped>
</style>