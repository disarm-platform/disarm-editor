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
            :data="{instance_id: instance_id}"
        >
          Select file
        </file-upload>
        <span v-else>Select file</span>
      </el-button>

      <el-button
          :disabled="!(files.length > 0 && !all_uploaded && (!$refs.upload || !$refs.upload.active))"
          @click.prevent="$refs.upload.active = true" type="primary" size="mini">
        Start upload</el-button>

      <el-button
          :disabled="!(files.length > 0 && ($refs.upload && $refs.upload.active))"
          @click.prevent="reset_upload" type="warning" size="mini">
        Stop upload</el-button>
    </el-button-group>

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

    <h2>Upload geodata file</h2>
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
import { LoggedInUser } from '@/store';


export default Vue.extend({
  components: { FileUpload: VueUploadComponent },
  props: {
    logged_in_user: Object as () => null | LoggedInUser,
  },
  data() {
    return {
      files: [] as VUFile[],
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
      return this.$store.state.api_url + `/geodata_level/upload`;
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
  },
  methods: {
    reset_upload() {
      this.$router.go(0);
    },
  },
});
</script>

<style lang='scss' scoped>
</style>
