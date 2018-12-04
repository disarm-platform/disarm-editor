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
          @change="update_local_from_node"
      >
      </NodeWrapper>

    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {cloneDeep, set} from 'lodash';

  import NodeWrapper from './nodes/NodeWrapper.vue';
  import {EditableInstanceConfig, InstanceConfig} from '@/types';
  import {edit_nodes} from './nodes/EditNodeDefinitions';
  import {CONFIG_MUTATIONS} from '@/store/config'

  export default Vue.extend({
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    components: {NodeWrapper},
    data() {
      return {
        edit_nodes,
      };
    },
    methods: {
      update_local_from_node(node_config: any, path_name: string) {
        const copy: EditableInstanceConfig = cloneDeep(this.live_instance_config);
        set(copy, path_name, node_config);
        this.$store.commit(CONFIG_MUTATIONS.UPDATE_CONFIG_WITH_UNSAVED, copy);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>