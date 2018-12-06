<template>
  <div>
    <SelectInstance
      :instance_list="instance_list"
      @select="select_instance"
      @create="create_instance"
    ></SelectInstance>

    <CreateInstance @create_new="create_instance" style="margin-top: 20px;"></CreateInstance>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import SelectInstance from '@/pages/select/SelectInstance.vue';
import CreateInstance from '@/pages/select/CreateInstance.vue';
import {Instance, InstanceConfig} from '@/types';
import {CONFIG_ACTIONS} from '@/store/config';

export default Vue.extend({
  components: {SelectInstance, CreateInstance},
  computed: {
    selected_instance(): Instance { return this.$store.state.config_module.selected_instance; },
    existing_config(): InstanceConfig { return this.$store.state.config_module.live_instance_config; },
    instance_list(): Instance[] { return this.$store.state.config_module.instance_list; },
    unsaved_changes(): boolean {
      return this.$store.state.config_module.unsaved_config_changes
        || this.$store.state.config_module.unsaved_permission_changes;
    },
  },
  async mounted() {
    if (this.existing_config && this.unsaved_changes) {
      this.confirm_clear_config();
    } else {
      this.load_instances();
    }
  },
  methods: {
    async load_instances() {
      await this.$store.dispatch(CONFIG_ACTIONS.FETCH_INSTANCES);
    },
    async select_instance(instance: Instance) {
      await this.$store.dispatch(CONFIG_ACTIONS.SELECT_INSTANCE, instance);
      this.$router.push({name: 'edit'});
    },
    async create_instance(instance: Instance) {
      await this.$store.dispatch(CONFIG_ACTIONS.CREATE_INSTANCE, instance);
    },
    async confirm_clear_config() {
      try {
        await this.$confirm('You have unsaved changes to the config. Discard your changes and continue?', 'Warning', {
          confirmButtonText: 'Yes, clear changes',
          cancelButtonText: 'No, continue editing',
          type: 'warning',
        });
        await this.$store.dispatch(CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
        this.$message({
          type: 'success',
          message: 'Instance and config reset',
        });
        this.load_instances();
      } catch (e) {
        this.$message({
          type: 'info',
          message: 'Canceled',
        });
        this.$router.push({name: 'edit'});
      }
    },
  },
});
</script>

<style scoped>

</style>
