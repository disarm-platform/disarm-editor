<template>
  <div>
    <h2>List of instances</h2>

    <el-form :inline="true" :model="instanceForm" class="demo-form-inline">
  <el-form-item label="New Instance">
    <el-input v-model="instanceForm.name" placeholder="New Instance Name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="saveInstance">Save</el-button>
  </el-form-item>
</el-form>

    <el-table
        ref="instance_table"
        :data="instance_list"
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
          prop="name">
      </el-table-column>
    </el-table>

    <el-button type="text" @click="deselect">Select none</el-button>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Instance} from '@/types';
  import {CONFIG_ACTIONS} from '@/store/config'

  export default Vue.extend({
    props: {
      instance_list: Array as () => Instance[],
    },
    data() {
      return {
        currentRow: null as null | Instance,
        instanceForm:{
          name:''
        } as Instance
      };

    },
    computed: {
      selected_instance(): Instance { return this.$store.state.selected_instance; },
    },
    mounted() {
      // Highlight row if selected_instance
      if (this.selected_instance) {
        const selected_row = this.instance_list.find((i) => i._id === this.selected_instance._id);
        // @ts-ignore
        this.$refs.instance_table.setCurrentRow(selected_row);
      }
    },
    methods: {
      handleCurrentChange(val: Instance) {
        this.currentRow = val;
        this.$emit('select', val);
      },
      deselect() {
        // @ts-ignore
        this.$refs.instance_table.setCurrentRow();
        this.$emit('deselect');
      },
      saveInstance(){
        this.$store.dispatch(CONFIG_ACTIONS.CREATE_INSTANCE,this.instanceForm);
      }
    },
  });
</script>

<style lang='scss' scoped>

</style>
