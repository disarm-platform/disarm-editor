<template>
    <el-form>
      <el-form-item label="Title">
        <el-input :value="value.title" @input="on_change('title', $event)"></el-input>
      </el-form-item>

      <el-form-item label="Icon">
        <el-input :value="value.icon" @input="on_change('icon', $event)"></el-input>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  props: {
    value: Object,
  },
  methods: {
    on_change(field_name: string, incoming_value: string) {
      const config = this.value;

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