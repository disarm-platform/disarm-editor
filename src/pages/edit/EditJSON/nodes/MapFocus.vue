<template>
  <div>
    <el-form>
      
      <el-form-item label="Latitude">
        <el-input-number type="number" v-model="live_node_config.centre.lat" @input="emit_change"></el-input-number>
      </el-form-item>

      <el-form-item label="Longitude">
        <el-input-number v-model="live_node_config.centre.lng" @input="emit_change"></el-input-number>
      </el-form-item>

      <el-form-item label="Zoom">
        <el-input-number :min="0" :max="50" v-model="live_node_config.zoom" @input="emit_change"></el-input-number>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../EditNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>
