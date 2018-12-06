<template>
  <div>

    <div>
      <strong>Instance:</strong> {{selected_instance.name}}
      <el-button type='text' @click="reset_selected_config">Change instance</el-button>
    </div>

    <div style="margin-bottom: 20px;">
      <el-button-group>
        <el-button :type='current_view === "users" ? "info" : ""' plain size="mini"
                   @click="$router.push({name: 'users'})">Users
        </el-button>
        <el-button :type='current_view === "permissions" ? "info" : ""' plain size="mini"
                   @click="$router.push({name: 'permissions'})">Permissions
        </el-button>
        <el-button :type='current_view === "json" ? "info" : ""' plain size="mini"
                   @click="$router.push({name: 'json'})">Config
        </el-button>
        <el-button :type='current_view === "geodata" ? "info" : ""' plain size="mini"
                   @click="$router.push({name: 'geodata'})">Geodata
        </el-button>
      </el-button-group>

    </div>
    <router-view
    ></router-view>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  import {Instance, InstanceConfig} from '@/types';

  export default Vue.extend({
    computed: {
      live_instance_config(): InstanceConfig { // This is retrieved just for cosmetic use, not for its data
        return this.$store.state.config_module.live_instance_config;
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
