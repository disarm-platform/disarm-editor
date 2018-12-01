<template>
  <div>

    <div style="display: flex; justify-content: space-between;">
      <h1 style="margin-top: 0;">{{display_name}}</h1>
    </div>

    <!-- Component itself -->
    <component
        v-if="node_config"
        :is="component_name"
        :incoming_node_config="node_config"
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
  import {get, debounce, cloneDeep, set} from 'lodash';

  import {component_list} from './nodes/EditNodeDefinitions';
  import {InstanceConfig} from '@/types';
  import {blank_for_path} from '@/lib/sample_node'
  import {CONFIG_MUTATIONS} from "@/store/config"

  export default Vue.extend({
    components: {...component_list},
    props: {
      instance_config: Object as () => InstanceConfig,
      component_name: String,
      display_name: String,
      node_name: String,
      path_name: String,
    },
    data() {
      return {
        node_config_backup: {},
      };
    },
    computed: {
      node_config():any  {
        return get(this.instance_config, this.path_name);
      },
    },
    mounted() {
      this.node_config_backup = cloneDeep(this.node_config);
    },
    methods: {
      change_wrapper: debounce(function(this: any, node_config) {
        const copy = cloneDeep(this.instance_config);
        set(copy, this.path_name, node_config);
        this.$store.commit(CONFIG_MUTATIONS.SET_SELECTED_CONFIG, copy);
      }, 450),
      async insert_blank() {
        const content = await blank_for_path(this.path_name);
        this.change_wrapper(content);
      }
    },
  });
</script>