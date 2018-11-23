<template>
  <div>
    <h2>List of configs for <em>{{selected_instance.name}}</em></h2>

    <el-table
        :data="config_list"
        highlight-current-row
        @current-change="handleCurrentChange"
        size="small"
        style="width: 100%">

      <el-table-column
          label="Actions"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">Select</el-button>
        </template>

      </el-table-column>
      <el-table-column
          prop="_id">
      </el-table-column>
      <el-table-column
          prop="config_version">
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Instance, InstanceConfig} from '@/types';

  export default Vue.extend({
    props: {
      selected_instance: Object as () => Instance,
      config_list: Array as () => InstanceConfig[],
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
        this.$emit('select', val);
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
