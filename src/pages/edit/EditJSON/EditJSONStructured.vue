<template>
  <el-tabs tab-position="left" style="height: 800px; overflow: scroll;" @tab-click="tab_click">
    <el-tab-pane
      v-if="live_instance_config"
      v-for="{display_name, component_name, node_name, path_name} in edit_nodes"
      :key="component_name"
      @tab-click="tab_click"
    >
      <span slot="label" :style="style_errors_in_node(node_name)">{{display_name}}</span>
      <NodeWrapper
        :display_name="display_name"
        :node_name="node_name"
        :path_name="path_name"
        :component_name="component_name"
        :instance_config="live_instance_config"
        :priority_messages="priority_messages"
        @change="update_local_from_node"
      ></NodeWrapper>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import Vue from 'vue';
import { cloneDeep, set } from 'lodash';

import NodeWrapper from './nodes/NodeWrapper.vue';
import {
  InstanceConfig,
  ValidationMessage,
} from '@/types';
import { edit_nodes } from './nodes/EditNodeDefinitions';
import { CONFIG_MUTATIONS } from '@/store/config';

export default Vue.extend({
  props: {
    live_instance_config: Object as () => InstanceConfig,
    priority_messages: Array as () => ValidationMessage[],
  },
  components: { NodeWrapper },
  data() {
    return {
      edit_nodes,
    };
  },
  methods: {
    update_local_from_node(node_config: any, path_name: string) {
      const copy: InstanceConfig = cloneDeep(this.live_instance_config);
      set(copy, path_name, node_config);
      this.$store.commit(CONFIG_MUTATIONS.UPDATE_CONFIG_WITH_UNSAVED, copy);
    },
    style_errors_in_node(node_name: string): string {
      const count = this.priority_messages.filter((msg) => {
        return msg.source_node === node_name;
      }).length;
      if (count > 0) {
        return 'color: red;';
      } else {
        return '';
      }
    },
    tab_click() {
      return false;
    },
  },
});
</script>

<style lang='scss' scoped>
.red {
  color: red;
}
</style>