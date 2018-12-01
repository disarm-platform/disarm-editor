<template>
    <el-form v-if="node_config">
      <el-form-item label="Title">
        <el-input :value="node_config.title" @input="on_change('title', $event)"></el-input>
      </el-form-item>

      <el-form-item label="Icon">
        <el-input :value="node_config.icon" @input="on_change('icon', $event)"></el-input>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  props: {
    node_config: Object,
  },
  methods: {
    on_change(field_name: string, incoming_value: string) {
      const config = this.node_config;

      if (incoming_value) {
        config[field_name] = incoming_value;
      } else {
        delete config[field_name];
      }

      this.$emit('input', config);
    },
  },
});
</script>

<style scoped>

</style>