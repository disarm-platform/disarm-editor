<template>
  <div>
    <JSONEditor :node_config="live_node_config" @change="update_node_config"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import JSONEditor from '../components/SimpleJSONEditor.vue';

  export default Vue.extend({
    components: {JSONEditor},
  });
</script>

<style scoped>

</style>