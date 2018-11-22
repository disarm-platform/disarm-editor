<template>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {MUTATIONS} from '@/store'

  export default Vue.extend({
    mounted() {
      this.$store.commit(MUTATIONS.RESET_USER);
      this.$router.push({name: 'login'});
    },
  });
</script>

<style scoped>
</style>