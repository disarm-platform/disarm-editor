<template>
  <div>

    <div>
      <el-button-group style="margin-bottom: 20px;">
        <el-button :disabled="!unsaved_changes" @click="update_remote" type="primary" size="mini">Upload changes
        </el-button>
        <el-button @click="check_if_valid" type="warning" size="mini">Check if valid</el-button>
      </el-button-group>
    </div>


    <div style="margin-bottom: 20px;">
      <el-switch
          v-model="ui_show_raw"
          active-text="Raw"
          inactive-text="Structured"
          active-color="#a1d1ff"
          inactive-color="#4ea8ff">
      </el-switch>
    </div>

    <EditJSONRaw v-if="ui_show_raw" :config="live_instance_config" :priority_messages="priority_messages"></EditJSONRaw>
    <EditJSONStructured v-else :live_instance_config="live_instance_config"
                        :priority_messages="priority_messages"></EditJSONStructured>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {validate} from '@disarm/config-validation';

  import EditJSONStructured from './EditJSONStructured.vue';
  import EditJSONRaw from '@/pages/edit/EditJSON/EditJSONRaw.vue';

  import {InstanceConfig, ValidationMessage} from '@/types';
  import {TUnifiedResponse} from '@disarm/config-validation/build/module/lib/TUnifiedResponse';
  import {do_prioritise_messages} from '@/lib/priortise_messages';

  import {CONFIG_ACTIONS} from '@/store/config'

  export default Vue.extend({
    components: {EditJSONStructured, EditJSONRaw},
    data() {
      return {
        priority_messages: [] as ValidationMessage[],
        unified_response: {},
        ui_show_raw: false,
      };
    },
    computed: {
      live_instance_config(): InstanceConfig {
        return this.$store.state.config_module.live_instance_config;
      },
      unsaved_changes(): boolean {
        return this.$store.state.config_module.unsaved_config_changes;
      },

    },
    methods: {
      async update_remote(instance_config: InstanceConfig) {
        await this.$store.dispatch(CONFIG_ACTIONS.UPDATE_INSTANCE_CONFIG,instance_config)
      },
      check_if_valid() {
        if (!this.live_instance_config) {
          return (this.priority_messages = [
            {message: 'Not JSON, cannot validate', status: 'Red'},
          ]);
        }
        this.unified_response = validate(this.live_instance_config);
        this.priority_messages = this.prioritise_messages(this.unified_response as TUnifiedResponse);
        this.$emit('update_config', this.live_instance_config);
      },
      prioritise_messages(validation_output: TUnifiedResponse): ValidationMessage[] {
        return do_prioritise_messages(validation_output);
      },

    },
  });
</script>

<style lang='scss' scoped>
  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .blue {
    color: blue;
  }

  .yellow {
    color: yellow;
  }
</style>
