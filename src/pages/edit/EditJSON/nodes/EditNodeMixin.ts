import Vue from 'vue';
import {cloneDeep, get} from 'lodash';

export default Vue.extend({
  props: {
    node_config: Object,
  },
  data() {
    return {
      editable_config: {},
    };
  },
  watch: {
    node_config: {
      handler() {
        this.clone_node();
      },
      deep: true,
    },
  },
  created() {
    this.clone_node();
  },
  methods: {
    clone_node() {
      console.log('clone_node', this.node_config)
      this.editable_config = cloneDeep(this.node_config);
    },
    emit_change() {
      this.$emit('change_node', this.editable_config);
    },
  },
});
