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
  import {USERS_ACTIONS, USERS_MUTATIONS} from '@/store/users';
  import {sample_config} from '@/pages/seedData';
  import {CONFIG_ACTIONS, CONFIG_MUTATIONS} from '@/store/config';

  const sample_instances = [{_id: 'a1', name: 'Demo Config'}, {_id: 'b2', name: 'Different Demo Config'}];

  export default Vue.extend({
    components: {SelectInstance, SelectInstanceConfig},
    data() {
      return {
        instance_list: sample_instances as Instance[],
        config_list: [sample_config, {...sample_config, config_version: '2'}],
      };
    },
    computed: {
      selected_instance(): Instance { return this.$store.state.config_module.selected_instance; },
    },
    async mounted(){
      // DESELECT INSTANCE

      try { 
        this.instance_list = await this.$store.dispatch(CONFIG_ACTIONS.FETCH_INSTANCES);
      } catch(e) {
        console.log(e)
      }
      
    },
    methods: {
      async select_instance(instance: Instance) {
        this.$store.dispatch(CONFIG_ACTIONS.SELECT_INSTANCE, instance);
        this.$router.push({name: 'edit'});
      },
      async deselect_instance() {
        await this.$store.dispatch(CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
      },
      async create_instance(instance_data: any){
         this.$store.dispatch(CONFIG_ACTIONS.CREATE_INSTANCE,instance_data);
      }
    },
  });
</script>

<style scoped>

</style>
