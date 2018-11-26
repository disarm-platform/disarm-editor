<template>
  <div>
    <Applet v-model="node_config" @input="emit_change"/>
    <JSONEditor :node_config="node_config" @change="update_node_config"/>
  </div>
</template>

<script lang="ts">
import ConfigNodeMixin from '../ConfigNodeMixin';
import JSONEditor from '../JSONEditor.vue';
import Applet from './Applet.vue';

export default ConfigNodeMixin.extend({
  components: {Applet, JSONEditor},
  methods: {
    update_node_config(node_config: any) {
      this.node_config = node_config;
      this.emit_change();
    },
  },
});
</script>

<style scoped>

</style>