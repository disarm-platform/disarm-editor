<template>
  <el-row>

    <el-col :span="12">
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
        <el-button @click="insert_blank" size="mini">Insert new blank</el-button>
      </div>
    </el-col>

    <el-col :span="12" style="padding-left: 10px;">
      <ValidationMessagesList
          :priority_messages="priority_messages"
          :filtered_for_node="node_name"
      ></ValidationMessagesList>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import Vue from 'vue';
import {cloneDeep, debounce, get} from 'lodash';

import {component_list} from './EditNodeDefinitions';
import {InstanceConfig, ValidationMessage} from '@/types';
import {blank_for_path} from '@/lib/sample_node';
import ValidationMessagesList from '@/pages/edit/EditJSON/components/ValidationMessagesList.vue';

export default Vue.extend({
  components: {...component_list, ValidationMessagesList},
  props: {
    instance_config: Object as () => InstanceConfig,
    component_name: String,
    display_name: String,
    node_name: String,
    path_name: String,
    priority_messages: Array as () => ValidationMessage[],
  },
  data() {
    return {
      node_config_backup: {},
    };
  },
  computed: {
    node_config(): any {
      return get(this.instance_config, this.path_name);
    },
  },
  mounted() {
    this.node_config_backup = cloneDeep(this.node_config);
  },
  methods: {
    change_wrapper: debounce(function(this: any, updated_node_config) {
      this.$emit('change', updated_node_config, this.path_name);
    }, 450),
    async insert_blank() {
      const content = await blank_for_path(this.path_name);
      this.change_wrapper(content);
    },
  },
});
</script>