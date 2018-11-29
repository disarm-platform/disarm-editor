<template>
  <el-input
      ref="editor"
      type="textarea"
      :rows="20"
      placeholder="Please input"
      v-model="config_copy_string">
  </el-input>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {InstanceConfig} from '@/types';

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        config_copy_string: '',
      };
    },
    computed: {
      config_copy(): InstanceConfig | null {
        try {
          return JSON.parse(this.config_copy_string);
        } catch (e) {
          return null;
        }
      },
    },
    mounted() {
      this.config_copy_string = JSON.stringify(this.live_instance_config, null, 2);
    },
    methods: {

    },
  })
  ;
</script>

<style lang='scss' scoped>

</style>