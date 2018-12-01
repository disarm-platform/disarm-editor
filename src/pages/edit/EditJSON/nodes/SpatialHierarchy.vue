<template>
  <SimpleJSONEditor :config="editable_config" @change="stick_change"/>
</template>

<script lang="ts">
  import EditNodeMixin from './EditNodeMixin';
  import SimpleJSONEditor from '@/pages/edit/EditJSON/components/SimpleJSONEditor.vue'

  export default EditNodeMixin.extend({
    components: {SimpleJSONEditor},
  });
</script>
