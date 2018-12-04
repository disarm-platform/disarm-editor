<template>
  <div>
    <el-alert v-if="json_error" type="error">Invalid JSON</el-alert>
    <el-row>
      <el-col :span="12">

        <el-input rows="20" type="textarea" v-model="config_string"></el-input>

        <div style="margin: 0.5em 0;">
          <el-button @click="upload_changes" type="primary">Save</el-button>
          <el-button @click="clear" type="warning">Clear</el-button>
        </div>
      </el-col>


      <el-col :span="12" style="padding-left: 10px;">
        <ValidationMessagesList :priority_messages="priority_messages"></ValidationMessagesList>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  import {EditableInstanceConfig, ValidationMessage} from '@/types';
  import {CONFIG_MUTATIONS} from '@/store/config';
  import ValidationMessagesList from '@/pages/edit/EditJSON/components/ValidationMessagesList.vue'

  export default Vue.extend({
    components: {ValidationMessagesList},
    props: {
      config: Object as () => any,
      priority_messages: Array as () => ValidationMessage[],
    },
    data() {
      return {
        config_string: '',
        json_error: false,
      };
    },
    computed: {
      local_config(): any {
        try {
          return JSON.parse(this.config_string as string);
        } catch (e) {
          return null;
        }
      },
    },
    created() {
      this.config_string = JSON.stringify(this.config, undefined, 2);
    },
    methods: {
      upload_changes() {
        this.$store.commit(CONFIG_MUTATIONS.UPDATE_CONFIG_WITH_UNSAVED, this.local_config);
      },
      clear() {
        this.config_string = '';
        this.upload_changes();
      },
    },
  });
</script>

<style scoped>
</style>