<template>
  <div>
    <el-button @click="reset_selected_config">< Change config</el-button>
    <el-button-group>
      <el-button @click="$router.push({name: 'users'})">users</el-button>
      <el-button @click="$router.push({name: 'json'})">json</el-button>
      <el-button @click="$router.push({name: 'geodata'})">geodata</el-button>
    </el-button-group>
    <el-button @click="save">Save</el-button>

    <router-view
        :live_instance_config="live_instance_config"
    ></router-view>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {InstanceConfig} from '@/types';
  import {MUTATIONS} from '@/store'

  export default Vue.extend({
    computed: {
      live_instance_config(): InstanceConfig { return this.$store.state.live_instance_config; },
    },
    methods: {
      reset_selected_config() {
        this.$store.commit(MUTATIONS.RESET_SELECTED_CONFIG);
        this.$router.push('/')
      },
      save() {
        console.log('[EDIT] SAVE');
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
