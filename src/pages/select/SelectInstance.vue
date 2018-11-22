<template>
  <div>
    <h2>List of instances you can see</h2>
    {{JSON.stringify(instance_list)}}
    <el-button type="text" @click="select(0)">Select instance</el-button> |
    <el-button type="text" @click="deselect">Select none</el-button>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Instance} from '@/types';


  export default Vue.extend({
    props: {
      instance_list: Array as () => Instance[],
    },
    methods: {
      select(index: number) {this.$emit('select', this.instance_list[index]); },
      deselect() { this.$emit('deselect'); },
    },
  });
</script>

<style lang='scss' scoped>

</style>
