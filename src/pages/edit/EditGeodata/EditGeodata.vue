<template>
  <div>
    <el-button-group>
      <el-button :disabled="files.length > 0" type='success' size="mini">
        <file-upload
            v-if="files.length === 0 || !all_uploaded"
            ref="upload"
            v-model="files"
            :post-action="server_url"
            :multiple="false"
            :headers="headers"
        >
          Select file
        </file-upload>
        <span v-else>Select file</span>
      </el-button>

      <el-button :disabled="!(!$refs.upload || !$refs.upload.active)" type='success' size="mini"
                 @click="ui_level_name_visible = ! ui_level_name_visible">
        Enter level name
      </el-button>

      <el-button
          :disabled="!(files.length > 0 && level_name && !all_uploaded && (!$refs.upload || !$refs.upload.active))"
          @click.prevent="$refs.upload.active = true" type="primary" size="mini">
        Start upload</el-button>

      <el-button
          :disabled="!(files.length > 0 && ($refs.upload && $refs.upload.active))"
          @click.prevent="reset_upload" type="warning" size="mini">
        Stop upload</el-button>
    </el-button-group>

    <el-input v-if="ui_level_name_visible" type="text" v-model="level_name" placeholder="Enter level name"></el-input>

    <div v-if="files.length > 0 && level_name" v-html="intended_upload_summary"></div>

    <div style="margin-top: 20px;">
      <el-progress
          v-show='progress' :text-inside="true"
          :stroke-width="18" :percentage="progress"
          :status="status"></el-progress>
    </div>

    <div v-show="all_uploaded" style="margin-top: 20px;">
      Successful upload of: {{all_file_names}}.
      Visit the <router-link :to="{name: 'json'}">editor</router-link> to use it in the configuration.
      <el-button @click="reset_upload">Upload another</el-button>
    </div>

    <h3>Upload geodata file</h3>
    <p>Geodata should be a JSON file containing a GeoJSON FeatureCollection.</p>
    <p>
      It's a good idea to make sure the file is already named with the type of
      geodata and a date or version: e.g. <code>villages.2018-11-23.json</code>
      This will help you selecting the right file in the
      <router-link to="/edit/json">config editor</router-link>.
    </p>

  </div>

</template>

<script lang='ts'>
import Vue from 'vue';
import {get} from 'lodash';
import VueUploadComponent from 'vue-upload-component';
import { LoggedInUser } from '../../../store';


export default Vue.extend({
  components: { FileUpload: VueUploadComponent },
  props: {
    logged_in_user: Object as () => null | LoggedInUser,
  },
  data() {
    return {
      files: [] as VUFile[],
      level_name: '',
      ui_level_name_visible: false,
    };
  },
  computed: {
    headers(): any {
      return {'API-Key': get(this.$store, 'state.logged_in_user.api_key')};
    },
    instance_id(): string {
        return get(this.$store, 'state.config_module.selected_instance._id');
    },
    server_url(): string {
      return this.$store.state.api_url + `/geodata_level/upload` +
        `?instance_id=${this.instance_id}&level_name=${this.level_name}`;
    },
    progress(): number {
      if (this.files.length === 0) {
        return 0;
      }
      return parseFloat(this.files[0].progress);
    },
    status(): string {
      if (this.files.length === 0) {
        return 'exception';
      }
      return this.files.every((file) => file.success) ? 'success' : 'text';
    },
    all_uploaded(): boolean {
      if (this.files.length === 0) {
        return false;
      }
      return (
        this.files.filter((file) => file.success).length === this.files.length
      );
    },
    all_file_names(): string {
      if (this.files.length === 0) {
        return '';
      }
      return this.files.map((file) => file.name).join(',');
    },
    intended_upload_summary(): string {
      if (!this.files.length || !this.level_name) {
        return '';
      }
      return `Will upload <em>${this.files[0].name}</em> for level <em>${this.level_name}</em>`;
    },
  },
  methods: {
    reset_upload() {
      this.$router.go(0);
    },
    start_upload() {
    },
  },
});
</script>

<style lang='scss' scoped>
  .file-uploads {
    overflow: inherit;
  }
</style>
