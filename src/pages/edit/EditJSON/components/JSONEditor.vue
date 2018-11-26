<template>
  <div>
    <el-alert v-if="json_error" type="error" title="Configuration is not valid json"
              description="Ensure it is valid JSON and try again"/>

    <el-input rows="20" type="textarea" v-model="local_node_config"></el-input>

    <div style="margin: 0.5em 0;">
      <el-button @click="format_as_json">Format</el-button>
      <el-button @click="save">Save</el-button>
    </div>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {InstanceConfig} from '../../../../types'

  export default Vue.extend({
    props: {
      live_node_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        local_node_config: '' as string,
        json_error: false,
      };
    },
    watch: {
      live_node_config: {
        handler() {
          this.stringify_config();
        },
        deep: true,
      },
    },
    created() {
      this.stringify_config();
    },
    methods: {
      stringify_config(): void {
        try {
          this.json_error = false;
          this.local_node_config = JSON.stringify(this.live_node_config, undefined, 4);
        } catch (e) {
          // passing the json failed
          this.json_error = true;
        }
      },
      save() {
        try {
          const local_config_as_object = JSON.parse(this.local_node_config);
          this.$emit('change', local_config_as_object);
        } catch (e) {
          this.json_error = true;
        }
      },
      format_as_json() {
        try {
          this.json_error = false;
          const json = JSON.parse(this.local_node_config);
          this.local_node_config = JSON.stringify(json, undefined, 4);
        } catch (e) {
          this.json_error = true;
        }
      },
    },
  });
</script>
