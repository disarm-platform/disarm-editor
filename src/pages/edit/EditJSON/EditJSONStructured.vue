<template>
  <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
    <el-tab-pane
        v-if="live_instance_config"
        v-for="{display_name, component_name, node_name, path_name, show_include} in edit_nodes"
        :key="component_name"
    >
  <span slot="label">
  {{display_name}}
  </span>
      <ConfigComponentWrapper
          :display_name="display_name"
          :node_name="node_name"
          :path_name="path_name"
          :component_name="component_name"
          :config="live_instance_config"
      >
      </ConfigComponentWrapper>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import ConfigComponentWrapper from '@/pages/edit/EditJSON/ConfigComponentWrapper.vue';
  import {InstanceConfig} from '@/types';
  import {edit_nodes} from '@/pages/edit/EditJSON/EditNodeDefinitions';


  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    components: {ConfigComponentWrapper},
    mounted() {
    },
    data() {
      return {
        edit_nodes,
      };
    },
    methods: {},
  });
</script>

<style lang='scss' scoped>

</style>