<template>
  <div>
    <el-form>

      <el-form-item label="Title">
        <el-input v-model="editable_config.title" @input="emit_change"></el-input>
      </el-form-item>
      
      <el-form-item label="Location_name">
        <el-input v-model="editable_config.location_name" @input="emit_change"></el-input>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script lang="ts">
  import EditNodeMixin from './EditNodeMixin';

  export default EditNodeMixin.extend({
  });
</script>


