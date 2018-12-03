<template>
  <div>
    <GenericApplet :node_config="editable_config" @input="emit_change"/>
    <textarea v-model="editable_config.table_output"></textarea>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from './EditNodeMixin';
  import SimpleJSONEditor from '../components/SimpleJSONEditor.vue';
  import GenericApplet from '../components/GenericApplet.vue';

  export default ConfigNodeMixin.extend({
    components: {GenericApplet, SimpleJSONEditor},
  });
</script>
