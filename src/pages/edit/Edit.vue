<template>
  <div>
    <h2>[EDIT]: Just a holder</h2>
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
  import {InstanceConfig} from '@/types'

  export default Vue.extend({
    computed: {
      live_instance_config(): InstanceConfig { return this.$store.state.live_instance_config; },
    },
    methods: {
      save() {
        console.log('[EDIT] SAVE');
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>