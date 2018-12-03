// Components using this mixin
// will have access to an editable copy of the node_config as `editable_config`
// must call the 'emit_change' method when the inputs are changed
//
// Optionally, can use the 'stick_change' method to update the 'editable_config' from a child
// instead of mutating props - e.g. for SimpleJSONEditor component


import Vue from 'vue';
import {cloneDeep, get} from 'lodash';

export default Vue.extend({
  props: {
    incoming_node_config: [Object, Array],
  },
  data() {
    return {
      editable_config: {},
    };
  },
  watch: {
    incoming_node_config: {
      handler() {
        this.clone_node_for_editing();
      },
      deep: true,
    },
  },
  created() {
    this.clone_node_for_editing();
  },
  methods: {
    clone_node_for_editing() {
      this.editable_config = cloneDeep(this.incoming_node_config);
    },
    emit_change() {
      this.$emit('change_node', this.editable_config);
    },
    stick_change(updated: any) {
      this.editable_config = updated;
      this.emit_change();
    },
  },
});
