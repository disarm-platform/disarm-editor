<template>
  <div>
    <el-button @click="update">Update</el-button>
    <el-button @click="validate">Validate</el-button>

    <el-row>
      <el-col :span="12">
        <EditJSONRaw :live_instance_config="live_instance_config"></EditJSONRaw>
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


    <!--<el-tabs tab-position="left" style="height: 800px; overflow: scroll;">-->
    <!--<el-tab-pane-->
    <!--v-if="live_instance_config"-->
    <!--v-for="{display_name, component_name, node_name, path_name, show_include} in edit_nodes"-->
    <!--:key="component_name"-->
    <!--&gt;-->
    <!--<span slot="label">-->
    <!--{{display_name}}-->
    <!--</span>-->
    <!--<ConfigComponentWrapper-->
    <!--:display_name="display_name"-->
    <!--:node_name="node_name"-->
    <!--:path_name="path_name"-->
    <!--:component_name="component_name"-->
    <!--:config="live_instance_config"-->
    <!--&gt;-->
    <!--</ConfigComponentWrapper>-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->


  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {validate} from '@disarm/config-validation';

  import EditJSONRaw from './EditJSONRaw.vue';

  import {InstanceConfig, ValidationMessage} from '@/types';
  import {edit_nodes} from '@/pages/edit/EditJSON/EditNodeDefinitions';
  import ConfigComponentWrapper from '@/pages/edit/EditJSON/ConfigComponentWrapper.vue';
  import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
  import {do_prioritise_messages} from '@/pages/edit/EditJSON/priortise';

  export default Vue.extend({
    components: {ConfigComponentWrapper, EditJSONRaw},
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        edit_nodes,
        priority_messages: [] as ValidationMessage[],
        unified_response: {},
      };
    },
    methods: {
      update() {
        console.log('[update] does nothing');
      },
      validate() {
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
