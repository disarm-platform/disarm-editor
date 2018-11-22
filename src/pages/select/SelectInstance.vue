<template>
  <div>
    <h2>List of instances you can see</h2>
    {{JSON.stringify(instance_list)}}
    <el-button type="text" @click="$emit('select', instance_list[0])">Select</el-button>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Instance} from '@/types'


  export default Vue.extend({
    props: {
      instance_list: Array as () => Instance[],
    },
  });
</script>

<style lang='scss' scoped>

</style>