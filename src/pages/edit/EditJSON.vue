<template>
  <div>
    <textarea name="editor" cols="50" rows="20">{{live_instance_config}}</textarea>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {InstanceConfig} from '@/types';
  const schema = require('@locational/config-validation/build/module/config_schema.json');

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    mounted() {
      console.log('schema', schema);
    },
    data() {
      return {};
    },
    methods: {},
  });
</script>

<style lang='scss' scoped>

</style>
