<template>
  <div>
    <el-form>

      <el-form-item label="Latitude">
        <el-input-number
            :min="-90" :max="90"
            v-model="editable_config.centre.lat" @input="emit_change"></el-input-number>
      </el-form-item>

      <el-form-item label="Longitude">
        <el-input-number
            :min="-180" :max="180"
            v-model="editable_config.centre.lng" @input="emit_change"></el-input-number>
      </el-form-item>

      <el-form-item label="Zoom">
        <el-input-number
            :min="0" :max="50"
            v-model="editable_config.zoom" @input="emit_change"></el-input-number>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts">
  import EditNodeMixin from './EditNodeMixin';

  export default EditNodeMixin.extend({
  });
</script>
