<template>
  <div>
      <div>
        <el-alert
          class="alert"
          :closable="false"
          v-for="(response, i) in responses"
          :key="i"
          :title="response.message"
          :type="response.type">
            <p style="margin-bottom: 0;" v-for="(message, index) in response.messages" :key="index">{{message}}</p>
        </el-alert>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  EStandardEdgeStatus,
  TStandardEdgeResponse,
} from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import { get_validation_result_for_node } from '../../lib/get_validation_result_for_node';

export default Vue.extend({
  props: {
    node_name: String,
    validation_result: Object,
  },
  computed: {
    responses(): any {
      if (!this.validation_result) {
        return [];
      }
      return get_validation_result_for_node(this.validation_result, this.node_name);
    },
  },
});
</script>

<style scoped>
  .alert {
    margin-bottom: 0.5em;
  }
</style>