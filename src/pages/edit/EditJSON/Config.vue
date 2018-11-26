<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Config</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="validate_config"
        >Validate</el-button>
      </div>

      <div>
        <el-alert :closable="false" v-if="config_valid" title="Validations passed" type="success"></el-alert>
      </div>

      <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
        <el-tab-pane
          v-if="config"
          v-for="{display_name, component_name, node_name, path_name, show_include} in component_defs"
          :key="component_name"
        >
          <span slot="label" :class="{red: !config_not_validated && errors_on_node(node_name)}">
            {{display_name}}
            <i v-if="config_not_validated"></i>
            <i class="el-icon-error" v-else-if="errors_on_node(node_name)"></i>
            <i class="el-icon-success" v-else></i>
          </span>
          <ConfigComponentWrapper
            :display_name="display_name"
            :node_name="node_name"
            :path_name="path_name"
            :component_name="component_name"
            :show_include="show_include"
            :validation_result="validation_result"
          ></ConfigComponentWrapper>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {set, unset} from 'lodash';
import {component_defs, component_list, ComponentDefinition} from './EditNodeDefinitions';
import ConfigComponentWrapper from './ConfigComponentWrapper.vue';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {TGeodataLayer} from '@locational/geodata-support/build/module/config_types/TGeodata';
import { geodata_cache } from '@/geodata_cache';
import {validate} from '@locational/config-validation';
import { generate_location_selection } from '@locational/geodata-support';
import { TSpatialHierarchy } from '@locational/geodata-support/build/main/config_types/TSpatialHierarchy';
import { EValidationStatus } from '@locational/geodata-support/build/module/config_types/TValidationResponse';
import {
  TStandardEdgeResponse,
  EStandardEdgeStatus,
} from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import { ValidationStatus } from '@/store/types';
import { EUnifiedStatus } from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import { ECustomEdgeStatus } from '@locational/config-validation/build/module/lib/TCustomEdgeResponse';
import { get_validation_result_for_node } from '@/lib/get_validation_result_for_node';

export interface Data {
  component_defs: ComponentDefinition[];
}

export default Vue.extend({
  // components: {ConfigComponentWrapper, ...component_list},
  // data(): Data {
  //   return {
  //     component_defs,
  //   };
  // },
  // computed: {
  //   config(): TConfig {
  //     return this.$store.state.applets_config;
  //   },
  //   validation_result(): any {
  //     return this.$store.state.validation_result;
  //   },
  //   config_not_validated(): boolean {
  //     return this.$store.state.validation_status === ValidationStatus.NotValidated;
  //   },
  //   config_valid(): boolean {
  //     return this.$store.state.validation_status === ValidationStatus.Valid;
  //   },
  // },
  // methods: {
  //   errors_on_node(node_name: string) {
  //     if (!this.validation_result) {
  //       return false;
  //     }
  //
  //     return get_validation_result_for_node(this.validation_result, node_name).length > 0;
  //   },
  //   validate_config() {
  //     // 0. Reset old validation result
  //     this.$store.commit('reset_validation_status');
  //     this.$store.commit('reset_validation_result');
  //       let location_selection_result = {}
  //
  //       if(!!this.config.spatial_hierarchy && geodata_cache) {
  //         location_selection_result = generate_location_selection(
  //               this.config.spatial_hierarchy as TSpatialHierarchy,
  //               geodata_cache,
  //           );
  //       }
  //       // 1. Attempt to create location_selection, if needed for full validation
  //
  //
  //
  //     // 2. Attach location_selection to config
  //     const config: TConfig = {
  //       ...this.config,
  //       location_selection: location_selection_result.location_selection,
  //     };
  //
  //
  //     // 3. Run config validation
  //     const validation_result = validate(config);
  //
  //     // 4. Shape validation result for consumption
  //     if (location_selection_result && location_selection_result.status === EValidationStatus.Red) {
  //
  //       const lc_result: TStandardEdgeResponse = {
  //         status: EStandardEdgeStatus.Red,
  //         message: location_selection_result.message,
  //         source_node_name: 'spatial_hierarchy',
  //         target_node_name: 'geodata',
  //         relationship_hint: 'fields exist',
  //         required: true,
  //         custom_edge_responses: (location_selection_result.support_messages as string[]).map((m) => {
  //           return {
  //             status: ECustomEdgeStatus.Red,
  //             message: m,
  //           };
  //         }),
  //         support_messages: [],
  //       };
  //
  //       validation_result.edge_messages.push(lc_result);
  //       if (validation_result.status === EUnifiedStatus.Green) {
  //         validation_result.status = EUnifiedStatus.Red;
  //       }
  //     }
  //
  //     const config_invalid = validation_result.status === EUnifiedStatus.Red;
  //     const validation_status = config_invalid ?  ValidationStatus.Invalid : ValidationStatus.Valid;
  //
  //     this.$store.commit('set_validation_result', validation_result);
  //     this.$store.commit('set_validation_status', validation_status);
  //   }
  // },
});
</script>
<style>
  .red {
    color: red;
  }
</style>
