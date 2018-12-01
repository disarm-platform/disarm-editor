<template>
  <div>
    <GenericApplet :node_config="editable_config" @input="emit_change"/>
    <SimpleJSONEditor :config="editable_config" @change="stick_change"/>
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
