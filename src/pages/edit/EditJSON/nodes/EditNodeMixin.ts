import Vue from 'vue';
import {cloneDeep, get} from 'lodash';
import {InstanceConfig} from '@/types';

export default Vue.extend({
  props: {
    path_name: String,
    config: Object as () => InstanceConfig,
  },
  data() {
    return {
      live_node_config: {},
      backup_node_config: {},
    };
  },
  watch: {
    config: {
      handler() {
        this.setup_node();
      },
      deep: true,
    },
  },
  created() {
    this.setup_node();
  },
  methods: {
    setup_node() {
      const got = get(this.config, this.path_name);
      if (got) {
        this.live_node_config = cloneDeep(got);
        this.backup_node();
      } else {
        console.log(`instance_config is missing property for ${this.path_name}`);
      }
    },
    reset_node() {
      this.live_node_config = cloneDeep(this.backup_node_config);
    },
    backup_node() {
      this.backup_node_config = cloneDeep(this.live_node_config);
    },
    emit_change() {
      this.$emit('change', this.live_node_config);
    },
  },
});
