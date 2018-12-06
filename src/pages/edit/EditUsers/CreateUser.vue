<template>
  <div>
    <el-button type='mini' @click="ui_visible = !ui_visible">{{ui_visible ? 'Hide form' : 'Add new'}}</el-button>
    <el-form v-if="ui_visible">
      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="Enter name" @blur="suggest_username"></el-input>
      </el-form-item>
      <el-form-item label="Login username (must be unique)">
        <el-input v-model="form.username" placeholder="Enter username (must be unique)"></el-input>
      </el-form-item>
      <el-form-item label="A secure password will be generated and displayed.">
        <el-input v-model="form.password" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary mini" @click="save_instance" :disabled="!valid">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {generate_password} from '@/lib/generate_password';
import {NewUserWithPassword} from '@/types';

export default Vue.extend({
  data() {
    return {
      ui_visible: false,
      form: {
        name: '',
        username: '',
        password: generate_password(),
      },
    };
  },
  computed: {
    valid(): boolean {
      return this.form.name !== '' && this.form.username !== '';
    },
  },
  methods: {
    reset_form() {
      this.form.name = '';
      this.form.username = '';
    },
    save_instance() {

      const new_user: NewUserWithPassword = {
        name: this.form.name,
        username: this.form.username,
        password: this.form.password,
        _id: null,
      };

      this.$emit('create_new', new_user);
      this.ui_visible = false;
      this.reset_form();
    },
    suggest_username() {
      if (this.form.username !== '') {return;}
      this.form.username = this.form.name.toLocaleLowerCase().replace(/\s/g,'.');
    },
  },
});
</script>

<style lang='scss' scoped>

</style>