<template>
  <div>
    <SelectInstance
      :instance_list="instance_list"
      @select="select_instance"
      @deselect="deselect_instance"
    ></SelectInstance>

    <SelectInstanceConfig
      v-if="selected_instance"
      :config_list="config_list"
      @select="select_config"
    ></SelectInstanceConfig>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import SelectInstance from '@/pages/select/SelectInstance.vue'
  import SelectInstanceConfig from '@/pages/select/SelectInstanceConfig.vue'
  import {Instance, InstanceConfig} from '@/types';
  import {ACTIONS, MUTATIONS} from '@/store';

  const sample_config: InstanceConfig = {
    config_id: 'my_id',
    config_version: '1',
    applets: {meta: {}},
    instance: {
      title: 'Instance Title',
      location_name: 'some location',
      slug: 'my_slug',
    },
  };

  export default Vue.extend({
    components: {SelectInstance, SelectInstanceConfig},
    data() {
      return {
        instance_list: [{_id: 'a1', name: 'first'}] as Instance[],
        config_list: [sample_config, {...sample_config, config_version: '2'}],
      }
    },
    computed: {
      selected_instance(): Instance { return this.$store.state.selected_instance; },
    },
    methods: {
      select_instance(instance: Instance) {this.$store.commit(MUTATIONS.SET_SELECTED_INSTANCE, instance);},
      deselect_instance() {this.$store.dispatch(ACTIONS.RESET_SELECTED_CONFIG);},
      select_config(instance_config: InstanceConfig) {
        this.$store.commit(MUTATIONS.SET_SELECTED_CONFIG, instance_config);
        this.$router.push({name: 'edit'});
      },
    }
  });
</script>

<style scoped>

</style>