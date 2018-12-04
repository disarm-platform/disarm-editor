<template>
  <div>

    <div style="margin-bottom: 20px;">
      <el-button @click="check_if_valid">Check if valid</el-button>
      <el-button @click="update_remote">Publish</el-button>
    </div>

    <el-row>
      <el-col :span="12">
        <el-switch
            v-model="ui_show_raw"
            active-text="Raw"
            inactive-text="Structured"
            active-color="#a1d1ff"
            inactive-color="#4ea8ff">
        </el-switch>

        <EditJSONRaw v-if="ui_show_raw" :config="live_instance_config"></EditJSONRaw>
        <EditJSONStructured v-else :live_instance_config="live_instance_config"></EditJSONStructured>

      </el-col>
      <el-col :span="12">
        <ul>
          <li
              v-for="(val, index) in priority_messages"
              :key="index"
          >
            <span :class="colour_me(val.status)">{{val.status}}</span>
            : {{val.message}}
            [<em>{{val.source_node ? val.source_node :'Unknown/schema'}}</em>]
          </li>
        </ul>
      </el-col>
    </el-row>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {validate} from '@disarm/config-validation';

  import EditJSONStructured from './EditJSONStructured.vue';
  import EditJSONRaw from '@/pages/edit/EditJSON/EditJSONRaw.vue'

  import {EditableInstanceConfig, InstanceConfig, ValidationMessage} from '@/types';
  import {TUnifiedResponse} from '@disarm/config-validation/build/module/lib/TUnifiedResponse';
  import {do_prioritise_messages} from '@/lib/priortise_messages';

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
    },
    methods: {
      update_remote(instance_config: EditableInstanceConfig) {
        console.log('[UPDATE REMOTE]');
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
      colour_me(text: string) {
        // take a string that has a color in it, return the color
        const matched = text.match(/(\bred\b|\bblue\b|\bgreen\b)/i);
        if (matched) {
          return matched[0].toLocaleLowerCase();
        } else {
          return 'yellow';
        }
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
