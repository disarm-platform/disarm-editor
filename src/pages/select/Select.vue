<template>
  <div>
    <SelectInstance
      :instance_list="instance_list"
      @select="select_instance"
      @deselect="deselect_instance"
    ></SelectInstance>

    <SelectInstanceConfig
      v-if="selected_instance"
      :selected_instance="selected_instance"
      :config_list="config_list"
      @select="select_config"
    ></SelectInstanceConfig>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import SelectInstance from '@/pages/select/SelectInstance.vue';
  import SelectInstanceConfig from '@/pages/select/SelectInstanceConfig.vue';
  import {Instance, InstanceConfig} from '@/types';
  import {ROOT_ACTIONS, ROOT_MUTATIONS} from '@/store';
  import {USERS_MUTATIONS} from '@/store/users';
  import {sample_config, sample_permissions, sample_users} from "@/pages/seedData"

  export default Vue.extend({
    components: {SelectInstance, SelectInstanceConfig},
    data() {
      return {
        instance_list: [{_id: 'a1', name: 'Demo Config'}, {_id: 'b2', name: 'Different Demo Config'}] as Instance[],
        config_list: [sample_config, {...sample_config, config_version: '2'}],
      };
    },
    computed: {
      selected_instance(): Instance { return this.$store.state.selected_instance; },
    },
    methods: {
      select_instance(instance: Instance) {
        this.$store.commit(ROOT_MUTATIONS.SET_SELECTED_INSTANCE, instance);
        this.$store.commit(USERS_MUTATIONS.SET_USERS, sample_users);
        this.$store.commit(USERS_MUTATIONS.SET_PERMISSIONS, sample_permissions);
      },
      deselect_instance() {this.$store.dispatch(ROOT_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG); },
      select_config(instance_config: InstanceConfig) {
        this.$store.commit(ROOT_MUTATIONS.SET_SELECTED_CONFIG, instance_config);
        this.$router.push({name: 'edit'});
      },
    },
  });
</script>

<style scoped>

</style>
