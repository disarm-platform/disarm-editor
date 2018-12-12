<template>
  <div>
    <el-button type='mini' @click="ui_visible = !ui_visible">{{ui_visible ? 'Hide form' : 'Add new'}}</el-button>
    <el-form v-if="ui_visible" @submit.native.prevent>
      <el-form-item label="New Instance">
        <el-input v-model="instance_form.name" placeholder="Enter name (must be unique)" @keyup.enter="submit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary mini" @click="save_instance" :disabled="!valid">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {cloneDeep} from 'lodash';

  export default Vue.extend({
    data() {
      return {
        ui_visible: false,
        instance_form: {
          name: '',
        },
      };
    },
    mounted() {
      this.reset_form();
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
        this.$emit('create_new', cloneDeep(this.instance_form));
        this.ui_visible = false;
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>