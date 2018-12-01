<template>
  <div>
    <el-alert v-if="json_error" type="error">Invalid JSON</el-alert>
    <el-input rows="20" type="textarea" v-model="config_string"></el-input>

    <div style="margin: 0.5em 0;">
      <el-button @click="save" type="primary">Save</el-button>
      <el-button @click="clear" type="warning">Clear</el-button>
    </div>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  import {InstanceConfig} from '@/types';

  export default Vue.extend({
    props: {
      config: Object,
    },
    data() {
      return {
        config_string: '' as string,
        json_error: false,
      };
    },
    computed: {
      local_node_config() {
        try {
          return JSON.parse(this.config_string);
        } catch (e) {
          return null;
        }
      }
    },
    created() {
      this.config_string = JSON.stringify(this.config, undefined, 2);
    },
    methods: {
      save() {
        this.$emit('change', this.local_node_config);
      },
      clear() {
        this.config_string = '';
        this.save();
      },
    },
  });
</script>
