<template>
  <div>
    <el-alert v-if="error_passing_json" type="error" title="Configuration is not valid json" description="Ensure it is valid JSON and try again" />

    <el-input rows="20" type="textarea" v-model="local_node_config"></el-input>

    <div style="margin: 0.5em 0;">
      <el-button @click="format_as_json">Format</el-button>
      <el-button  @click="save">Save</el-button>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export interface Data {
  error_passing_json: boolean;
  local_node_config: string;
}

export default Vue.extend({
  props: ['node_config'],
  data(): Data {
    return {
      error_passing_json: false,
      local_node_config: '',
    };
  },
  watch: {
    node_config: {
      handler() {
        this.set_local_node_config();
      },
      deep: true,
    },
  },
  created() {
    this.set_local_node_config();
  },
  methods: {
    set_local_node_config(): void {
      try {
        this.error_passing_json = false;
        this.local_node_config = JSON.stringify(this.node_config, undefined, 4);
      } catch (e) {
        // passing the json failed
        this.error_passing_json = true;
      }
    },
    save() {
      try {
        const local_config_as_object = JSON.parse(this.local_node_config);
        this.$emit('change', local_config_as_object);
      } catch (e) {
        this.error_passing_json = true;
      }
    },
    format_as_json() {
      try {
        this.error_passing_json = false;
        const json = JSON.parse(this.local_node_config);
        this.local_node_config = JSON.stringify(json, undefined, 4);
      } catch (e) {
        this.error_passing_json = true;
      }
    },
  },
});
</script>
