<template>
  <div>

    <Applet v-model="node_config" @input="emit_change"/>

    <el-checkbox v-model="node_config.metadata.show" @input="emit_change">Show metadata page</el-checkbox>

    <h5>Custom fields (optional_fields)</h5>

    <ul>
      <li v-for="(field, index) in node_config.metadata.optional_fields" :key="index">
        {{field}}
        <el-button type="text" icon="el-icon-close" @click="remove(index)"></el-button>
      </li>
    </ul>

    <el-form>
      <el-form-item label="Add a custom field">
        <el-input placeholder="Add a custom field" v-model="field"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">Add field</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import ConfigNodeMixin from '../ConfigNodeMixin';
import Applet from './Applet.vue';

export default ConfigNodeMixin.extend({
  components: {Applet},
  data() {
    return {
      field: '',
      node_config: {
        metadata: {},
      },
    };
  },
  methods: {
    add(e: Event) {
      e.preventDefault();
      // @ts-ignore
      this.node_config.metadata.optional_fields.push(this.field);
      this.field = '';
      this.emit_change();
    },
    remove(index: number) {
      // @ts-ignore
      this.node_config.metadata.optional_fields.splice(index, 1);
      this.emit_change();
    },
  },
});
</script>

<style scoped>

</style>