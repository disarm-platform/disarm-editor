<template>
  <div>
    <p>Editing: {{selected_instance.name}} @ version {{live_instance_config.config_version}}
      <el-button type='text' @click="reset_selected_config">Change</el-button>
    </p>

    <el-button-group>
      <el-button @click="$router.push({name: 'users'})">users</el-button>
      <el-button @click="$router.push({name: 'json'})">json</el-button>
      <el-button @click="$router.push({name: 'geodata'})">geodata</el-button>
    </el-button-group>
    <el-button @click="save">Save</el-button>

    <router-view
        :live_instance_config="live_instance_config"
        :users="users"
        :permissions="permissions"
    ></router-view>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {DevBasicUser, Instance, InstanceConfig, Permission} from '@/types';
  import {ACTIONS, MUTATIONS} from '@/store';

  export default Vue.extend({
    computed: {
      selected_instance(): Instance {
        return this.$store.state.selected_instance;
      },
      live_instance_config(): InstanceConfig {
        return this.$store.state.live_instance_config;
      },
      users(): DevBasicUser[] {
        return this.$store.state.users_module.users;
      },
      permissions(): Permission[] {
        return this.$store.state.users_module.permissions;
      },
    },
    methods: {
      reset_selected_instance() {
        this.$store.dispatch(ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
        this.$router.push('/');
      },
      reset_selected_config() {
        this.$store.commit(MUTATIONS.RESET_SELECTED_CONFIG);
        this.$router.push('/');
      },
      save() {
        console.log('[EDIT] SAVE');
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
