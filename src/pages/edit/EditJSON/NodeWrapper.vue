<template>
  <div>

    <div style="display: flex; justify-content: space-between;">
      <h1 style="margin-top: 0;">{{display_name}}</h1>
    </div>

    <!-- Component itself -->
    <component
        v-if="node_config"
        :is="component_name"
        :node_config="node_config"
        @change_node="change_wrapper"
    ></component>

    <div v-else>
      No data
      <el-button @click="insert_blank">Insert new blank</el-button>
    </div>


  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {get, cloneDeep} from 'lodash';

  import {component_list} from './nodes/EditNodeDefinitions';
  import {InstanceConfig} from '@/types';
  import {blank_for_path} from '@/lib/sample_node'

  export default Vue.extend({
    components: {...component_list},
    props: {
      instance_config: Object as () => InstanceConfig,
      component_name: String,
      display_name: String,
      node_name: String,
      path_name: String,
    },
    // data() {
    //   return {
    //     node_config_backup: {},
    //   };
    // },
    computed: {
      node_config() {
        return get(this.instance_config, this.path_name);
      },
    },
    // mounted() {
    //   this.node_config_backup = cloneDeep(this.node_config);
    // },
    methods: {
      change_wrapper(node_config) {
        this.$emit('change_root', {node_config, path_name: this.path_name});
      },
      async insert_blank() {
        const content = await blank_for_path(this.path_name);
        this.change_wrapper(content);
      }
    },
  });
</script>