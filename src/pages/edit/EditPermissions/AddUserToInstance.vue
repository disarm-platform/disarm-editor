<template>
  <el-select
      v-model="selected" filterable
      placeholder="Add user" size="mini"
      @change="add_user" style="margin-top: 10px;">
    <el-option
        v-for="item in users"
        :key="item.username"
        :label="item.username"
        :value="item">
    </el-option>
  </el-select>
</template>

<script lang='ts'>
import Vue from 'vue';
import {DevBasicUser} from '@/types';

export default Vue.extend({
  props: {
    users: Array as () => DevBasicUser[],
  },
  data() {
    return {
      selected: null as DevBasicUser | null,
    };
  },
  methods: {
    add_user() {
      this.$emit('add_user', this.selected);
      this.selected = null;
    },
  },
});
</script>

<style lang='scss' scoped>

</style>