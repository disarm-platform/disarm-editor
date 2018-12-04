<template>
  <div>
    <el-button type='mini' @click="ui_visible = !ui_visible">{{ui_visible ? 'Hide form' : 'Add new'}}</el-button>
    <el-form v-if="ui_visible">
      <el-form-item label="New Instance">
        <el-input v-model="instance_form.name" placeholder="Enter name (must be unique)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save_instance" :disabled="!valid">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      ui_visible: false,
      instance_form: {
        name: '',
      },
    };
  },
  computed: {
    valid(): boolean {
      return this.instance_form.name !== '';
    },
  },
  methods: {
    reset_form() {
      this.instance_form.name = '';
    },
    save_instance() {
      this.$emit('create_new', this.instance_form);
      this.reset_form();
    },
  },
});
</script>

<style lang='scss' scoped>

</style>