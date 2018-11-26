<template>
  <div>
    <el-button @click="save">Save CONFIG</el-button>

    <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
      <el-tab-pane
          v-if="live_instance_config"
          v-for="{display_name, component_name, node_name, path_name, show_include} in edit_nodes"
          :key="component_name"
      >
          <span slot="label" :class="{red: errors_on_node(node_name)}">
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


  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {InstanceConfig} from '@/types';
  import {edit_nodes} from '@/pages/edit/EditJSON/EditNodeDefinitions';
  import ConfigComponentWrapper from '@/pages/edit/EditJSON/ConfigComponentWrapper.vue';

  export default Vue.extend({
    components: {ConfigComponentWrapper},
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        edit_nodes,
      };
    },
    methods: {
      errors_on_node() {
        return (Math.random() > 0.5);
      },
      save() {
        console.log('[EDIT] save config', this.live_instance_config);
      },
    },
  });
</script>

<style lang='scss' scoped>
  .red {
    color: red;
  }
</style>
