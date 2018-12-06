<template>
  <div>

    <!--UPLOAD-->
    <el-form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h3>Upload new geodata file</h3>


      <el-form-item label="Level name (required)">
        <el-input type="text" v-model="level_name" placeholder="Enter level name"/>
      </el-form-item>

      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
               @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                class="input-file"/>
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="hasFile">
          Ready to upload file.
        </p>
      </div>

      <el-form-item>
        <el-button type="primary" @click="save" :disabled="!level_name || !formData">Upload</el-button>
        <el-button @click="reset">Reset</el-button>
      </el-form-item>
    </el-form>

    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="(item, index) in uploadedFiles" :key="index">
          <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
        </li>
      </ul>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>

  </div>
</template>


<script lang='ts'>
import Vue from 'vue';
import {standard_handler} from '../../../lib/handler';
import {AxiosPromise, AxiosResponse} from 'axios';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;


export default Vue.extend({
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: STATUS_INITIAL,
      uploadFieldName: 'file',
      level_name: '',
      formData: null,
    };
  },
  computed: {
    isInitial(): boolean {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving(): boolean {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess(): boolean {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed(): boolean {
      return this.currentStatus === STATUS_FAILED;
    },
    hasFile(): boolean {
      return this.formData && this.formData.files.length > 0;
    },
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      this.formData = null;
    },
    async save() {
      if (!this.formData) { return; }

      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      try {
        const options = {
          method: 'post',
          url: '/geodata_level/upload',
          data: this.formData,
        } as any;
        const res: AxiosResponse = await standard_handler(options);
        this.uploadedFiles = [].concat(res.data);
        this.currentStatus = STATUS_SUCCESS;
      } catch (err) {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;

      }
    },
    filesChange(fieldName: string, fileList: FileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) { return; }

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map((x) => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      formData.append('level_name', this.level_name);

      this.formData = formData;
    },
  },
});
</script>

<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>