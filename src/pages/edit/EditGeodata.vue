<template>
  <!--INSTRUCTIONS -->
  <div>
    <h2>Select a geodata file to upload</h2>
    <p>Geodata should be a JSON file containing a GeoJSON FeatureCollection.</p>
    <p>It's a good idea to make sure they are already named with the type of geodata and a date or version: e.g. <code>villages.2018-11-23.json</code> </p>
    <p>This will help you selecting the right file in the <router-link to="/edit/json">config editor</router-link>.</p>
  </div>

  <ul>
    <li v-for="file in files">{{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
  </ul>
  <file-upload
      ref="upload"
      v-model="files"
      post-action="/post.method"
      put-action="/put.method"
      @input-file="inputFile"
      @input-filter="inputFilter"
  >
    Upload file
  </file-upload>
  <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button">Start upload</button>
  <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" type="button">Stop upload</button>

</template>

<script lang='ts'>
  import Vue from 'vue';
  import VueUploadComponent from 'vue-upload-component';
  Vue.component('file-upload', VueUploadComponent);

  export default Vue.extend({
    data() {
      return {
        files: null as Array,
      }
    },
    methods: {
      handleFileUpload() {
        console.log('ready to upload something');
      },
      submitFile() {
        console.log('upload some files');
      },
    },
  });
</script>

<style lang='scss' scoped>

</style>
