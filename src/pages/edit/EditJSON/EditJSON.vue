<template>
  <div>
    <h2>gonna edit now</h2>
    <textarea name="editor" cols="50" rows="20">{{live_instance_config}}</textarea>
    <el-button @click="save">Save CONFIG</el-button>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {InstanceConfig} from '@/types';

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    methods: {
      save() {
        console.log('[EDIT] save config', this.live_instance_config);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
