<template>
  <div>
    <el-form>
    
      <el-form-item label="Title">
        <el-input v-model="node_config.title" @input="emit_change"></el-input>
      </el-form-item>
      
      <el-form-item label="Location_name">
        <el-input v-model="node_config.location_name" @input="emit_change"></el-input>
      </el-form-item>
      
      <el-form-item label="Slug">
        <el-input disabled v-model="node_config.slug" @input="emit_change"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>


