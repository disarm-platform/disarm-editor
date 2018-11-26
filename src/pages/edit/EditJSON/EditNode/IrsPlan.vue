<template>
  <div>
    <Applet v-model="live_node_config" @input="emit_change"/>
    <JSONEditor :node_config="live_node_config" @change="update_node_config"/>
  </div>
</template>

<script lang="ts">
import ConfigNodeMixin from './EditNodeMixin';
import JSONEditor from './components/JSONEditor.vue';
import Applet from './components/applet.vue';

export default ConfigNodeMixin.extend({
  components: {Applet, JSONEditor},
  methods: {
    update_node_config(node_config: any) {
      this.live_node_config = node_config;
      this.emit_change();
    },
  },
});
</script>

<style scoped>

</style>