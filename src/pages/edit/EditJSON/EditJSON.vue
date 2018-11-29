<template>
  <div>
    <el-button @click="update">Update</el-button>
    <el-button @click="validate">Validate</el-button>

    <el-row>
      <el-col :span="12">
        <el-input
            ref="editor"
            type="textarea"
            :rows="20"
            placeholder="Please input"
            v-model="config_copy_string">
        </el-input>
      </el-col>
      <el-col :span="12">
        <ul>
          <li v-for="(message, index) in priority_messages" :key="index">{{message}}</li>
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
  import {validate} from '@disarm/config-validation'

  import {InstanceConfig} from '@/types';
  import {edit_nodes} from '@/pages/edit/EditJSON/EditNodeDefinitions';
  import ConfigComponentWrapper from '@/pages/edit/EditJSON/ConfigComponentWrapper.vue';
  import {TUnifiedResponse} from "@locational/config-validation/build/module/lib/TUnifiedResponse"

  export default Vue.extend({
    components: {ConfigComponentWrapper},
    props: {
      live_instance_config: Object as () => InstanceConfig,
    },
    data() {
      return {
        edit_nodes,
        config_copy_string: '',
        priority_messages: [] as string[],
        unified_response: {},
      };
    },
    computed: {
      config_copy(): InstanceConfig | null {
        try {
          return JSON.parse(this.config_copy_string)
        } catch(e) {
          return null
        }
      },
    },
    watch: {
      'live_instance_config': () => {
        console.log('prop changed!');
      }
    },
    mounted() {
      this.config_copy_string = JSON.stringify(this.live_instance_config, null, 2);
    },
    methods: {
      update() {
        console.log('[update] do nothing')
      },
      validate() {
        if (!this.config_copy) {
          return this.priority_messages = ['Not JSON, cannot validate']
        }

        this.unified_response = validate(this.config_copy);
        this.priority_messages = this.prioritise_messages(this.unified_response);
        this.$emit('update_config', this.config_copy);
      },
      prioritise_messages(v: TUnifiedResponse): string[] {
        const result = [];

        if (v.status === 'Green') {
          result.push('No probs');
          return result;
        }

        if (v.edge_messages.length) {
          const failed = v.edge_messages.filter(m => m.status.match(/^Red/)).map(m => m.message);
          return result.concat(failed);
        } else {
          const failed = v.support_messages;
          return result.concat(failed);
        }


        return result
      }
    },
  });
</script>

<style lang='scss' scoped>
  .red {
    color: red;
  }
</style>
