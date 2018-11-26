<template>
  <div>
    <el-button @click="save">Save CONFIG</el-button>

    <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
      <el-tab-pane
          v-if="live_instance_config"
          v-for="{display_name, component_name, node_name, path_name, show_include} in edit_nodes"
          :key="component_name"
      >
          <span slot="label">
          <!--<span slot="label" :class="{red: !config_not_validated && errors_on_node(node_name)}">-->
            {{display_name}}
            <!--<i v-if="config_not_validated"></i>-->
            <!--<i class="el-icon-error" v-else-if="errors_on_node(node_name)"></i>-->
            <!--<i class="el-icon-success" v-else></i>-->
          </span>
        <ConfigComponentWrapper
            :display_name="display_name"
            :node_name="node_name"
            :path_name="path_name"
            :component_name="component_name"
            :config="live_instance_config"
        >
            <!--:show_include="show_include"-->
            <!--:validation_result="validation_result"-->
        </ConfigComponentWrapper>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {InstanceConfig} from '@/types';
  import {edit_nodes} from '@/pages/edit/EditJSON/EditNodeDefinitions'
  import ConfigComponentWrapper from '@/pages/edit/EditJSON/ConfigComponentWrapper.vue'

  export default Vue.extend({
    components: {ConfigComponentWrapper},
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        edit_nodes: edit_nodes,
      };
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
