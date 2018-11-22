<template>
  <div>
    <SelectInstance
      :instance_list="instance_list"
      @select="select_instance"></SelectInstance>

    <SelectInstanceConfig
      v-if="selected_instance"
      :config_list="config_list"
      @select="select_config"></SelectInstanceConfig>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {mapState} from 'vuex';

  import SelectInstance from '@/pages/select/SelectInstance.vue'
  import SelectInstanceConfig from '@/pages/select/SelectInstanceConfig.vue'
  import {Instance} from '@/types'
  import {MUTATIONS} from '@/store'

  export default Vue.extend({
    components: {SelectInstance, SelectInstanceConfig},
    data() {
      return {
        instance_list: [{_id: 'a1', name: 'first'}] as Instance[],
        config_list: [],
      }
    },
    computed: {
      ...mapState({
        selected_instance: (state) => state.selected_instance,
      }),
    },
    methods: {
      select_instance(instance: Instance) {
        this.$store.commit(MUTATIONS.SET_SELECTED_INSTANCE, instance);
      },
      select_config(instance_config) {
        console.log('select_config', instance_config)
      },
    }
  });
</script>

<style scoped>

</style>