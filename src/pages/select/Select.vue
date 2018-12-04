<template>
  <div>
    <SelectInstance
      :instance_list="instance_list"
      @select="select_instance"
      @create="create_instance"
      @deselect="deselect_instance"
    ></SelectInstance>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import SelectInstance from '@/pages/select/SelectInstance.vue';
  import {Instance} from '@/types';
  import {CONFIG_ACTIONS} from '@/store/config';

  const sample_instances = [{_id: 'a1', name: 'Demo Config'}, {_id: 'b2', name: 'Different Demo Config'}];

  export default Vue.extend({
    components: {SelectInstance},
    data() {
      return {
        instance_list: null as Instance[] | null,
      };
    },
    computed: {
      selected_instance(): Instance { return this.$store.state.config_module.selected_instance; },
    },
    async mounted(){
      // DESELECT INSTANCE
      await this.$store.dispatch(CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);

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
      async create_instance(instance: Instance){
         this.$store.dispatch(CONFIG_ACTIONS.CREATE_INSTANCE, instance);
      }
    },
  });
</script>

<style scoped>

</style>
