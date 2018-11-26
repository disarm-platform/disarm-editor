<template>
  <div>
    <p>Editing: {{selected_instance.name}} @ version {{live_instance_config.config_version}}
      <el-button type='text' @click="reset_selected_config">Change</el-button>
    </p>

    <el-button-group>
      <el-button @click="$router.push({name: 'users'})">users</el-button>
      <el-button @click="$router.push({name: 'permissions'})">permissions</el-button>
      <el-button @click="$router.push({name: 'json'})">json</el-button>
      <el-button @click="$router.push({name: 'geodata'})">geodata</el-button>
    </el-button-group>

    <router-view
        :live_instance_config="live_instance_config"
        :users="users"
        :permissions="permissions"

        @update_permissions="update_permissions"
        @reload="reload"
    ></router-view>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {DevBasicUser, Instance, InstanceConfig, Permission} from '@/types';
  import {ROOT_ACTIONS, ROOT_MUTATIONS} from '@/store';
  import {USERS_ACTIONS, USERS_MUTATIONS} from '@/store/users';

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
        this.$store.dispatch(ROOT_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
        this.$router.push('/');
      },
      reset_selected_config() {
        this.$store.commit(ROOT_MUTATIONS.RESET_SELECTED_CONFIG);
        this.$router.push('/');
      },
      update_permissions(permissions: Permission[]) {
        this.$store.commit(USERS_MUTATIONS.SET_PERMISSIONS, permissions);
      },
      reload(view) {

        switch (view) {
          case 'permissions':
            this.$store.dispatch(USERS_ACTIONS.REFETCH_PERMISSIONS);
            break;
          case 'users':
            this.$store.dispatch(USERS_ACTIONS.REFETCH_USERS);
            break;
        }
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
