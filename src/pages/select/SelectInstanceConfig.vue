<template>
  <div>
    List of Configs you can select
    <ul>
      <li v-for="config in config_list" :key="config.config_version" @click="select_config(config)">
        Select version {{config.config_version}}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {InstanceConfig} from '@/types'

  export default Vue.extend({
    props: {
      config_list: Array as () => InstanceConfig[],
    },
    methods: {
      select_config(config: InstanceConfig) {
        this.$emit('select', config);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>