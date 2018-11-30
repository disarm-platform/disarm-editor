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
      <NodeWrapper
          :display_name="display_name"
          :node_name="node_name"
          :path_name="path_name"
          :component_name="component_name"
          :instance_config="live_instance_config"
          @change_root="change_root"
      >
      </NodeWrapper>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {cloneDeep, set} from 'lodash';

  import NodeWrapper from './NodeWrapper.vue';
  import {InstanceConfig} from '@/types';
  import {edit_nodes} from './nodes/EditNodeDefinitions';

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    components: {NodeWrapper},
    mounted() {
    },
    data() {
      return {
        edit_nodes,
      };
    },
    methods: {
      change_root({node_config, path_name}) {
        console.log(`update config in EditJSONStructured`, node_config, path_name);
        const copy = set(cloneDeep(this.live_instance_config), path_name, node_config);
        this.$emit('update', copy);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>