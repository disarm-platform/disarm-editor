<template>
  <div>
    <p>Editing: {{selected_instance.name}} @ version {{config_version}}
      <el-button type='text' @click="reset_selected_config">Change instance</el-button>
    </p>

    <el-button-group style="margin-bottom: 20px;">
      <el-button :type='current_view === "users" ? "info" : ""' @click="$router.push({name: 'users'})">users</el-button>
      <el-button :type='current_view === "permissions" ? "info" : ""' @click="$router.push({name: 'permissions'})">permissions</el-button>
      <el-button :type='current_view === "json" ? "info" : ""' @click="$router.push({name: 'json'})">json</el-button>
      <el-button :type='current_view === "geodata" ? "info" : ""' @click="$router.push({name: 'geodata'})">geodata</el-button>
    </el-button-group>

    <router-view
    ></router-view>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {get} from 'lodash';

  import {DevBasicUser, Instance, InstanceConfig, Permission} from '@/types';
  import {USERS_ACTIONS, USERS_MUTATIONS} from '@/store/users';
  import {CONFIG_ACTIONS, CONFIG_MUTATIONS} from '@/store/config';

  export default Vue.extend({
    computed: {
      live_instance_config(): InstanceConfig { // This is retrieved just for cosmetic use, not for its data
        return this.$store.state.config_module.live_instance_config;
      },
      config_version(): string {
        return get(this.live_instance_config, 'config_version', 'unknown');
      },
      selected_instance(): Instance {
        return this.$store.state.config_module.selected_instance;
      },
      current_view(): string | undefined {
        return this.$route.name;
      },
    },
    methods: {
      reset_selected_config() {
        this.$router.push({name: 'select'});
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
