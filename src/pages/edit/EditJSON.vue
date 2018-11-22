<template>
  <div>
    <JsonEditor :objData="live_instance_config" v-model="live_instance_config" ></JsonEditor>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import JsonEditor from 'vue-json-edit';
  Vue.use(JsonEditor);

  import {InstanceConfig} from '@/types'

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    mounted() {
    },
    data() {
      return {};
    },
    methods: {}
  });
</script>

<style lang='scss' scoped>

</style>