<template>
  <div>
    <SimpleJSONEditor :node_config="editable_config" @change="emit_change"/>
  </div>
</template>

<script lang="ts">
  import EditNodeMixin from './EditNodeMixin';
  import SimpleJSONEditor from '@/pages/edit/EditJSON/components/SimpleJSONEditor.vue'

  export default EditNodeMixin.extend({
    components: {SimpleJSONEditor},
  });
</script>
