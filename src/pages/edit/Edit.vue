<template>
  <div>
    <p>Editing: {{selected_instance.name}} @ version {{config_version}}
      <el-button type='text' @click="reset_selected_config">Change</el-button>
    </p>

    <el-button-group>
      <el-button :type='current_view === "users" ? "info" : ""' @click="$router.push({name: 'users'})">users</el-button>
      <el-button :type='current_view === "permissions" ? "info" : ""' @click="$router.push({name: 'permissions'})">permissions</el-button>
      <el-button :type='current_view === "json" ? "info" : ""' @click="$router.push({name: 'json'})">json</el-button>
      <el-button :type='current_view === "geodata" ? "info" : ""' @click="$router.push({name: 'geodata'})">geodata</el-button>
    </el-button-group>

    <router-view
        :users="users"
        :permissions="permissions"

        @update_permissions="update_permissions"
        @add_user="add_user"
        @reload="reload"
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
      users(): DevBasicUser[] {
        return this.$store.state.users_module.users;
      },
      permissions(): Permission[] {
        return this.$store.state.users_module.permissions;
      },
      current_view(): string | undefined {
        return this.$route.name;
      },
    },
    methods: {
      reset_selected_instance() {
        this.$store.dispatch(CONFIG_ACTIONS.RESET_SELECTED_INSTANCE_AND_CONFIG);
        this.$router.push('/');
      },
      reset_selected_config() {
        this.$store.commit(CONFIG_MUTATIONS.RESET_SELECTED_CONFIG);
        this.$router.push('/');
      },
      update_permissions(permissions: Permission[]) {
        this.$store.commit(USERS_MUTATIONS.SET_PERMISSIONS, permissions);
      },
      add_user(user: DevBasicUser) {
        this.$store.commit(USERS_MUTATIONS.ADD_USER, user);
      },
      reload(view: string) {
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
