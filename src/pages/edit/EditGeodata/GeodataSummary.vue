<template>
  <div v-loading="ui_loading">

    <!--SHOW / HIDE UPLOAD -->
    <div>
      <el-button @click="ui_upload_visible = !ui_upload_visible" size="mini" type="success">
        {{!ui_upload_visible ? 'Upload geodata' : 'Hide form'}}
      </el-button>
    </div>
    <UploadGeodata v-if="ui_upload_visible"></UploadGeodata>



    <!--LIST SUMMARY -->
    <el-collapse v-if="geodata_summaries.length" v-model="ui_active_levels" style="margin-top: 20px;">
      <el-collapse-item v-for="level in geodata_summaries" :key="level._id"
                        :title="`${level.level_name} uploaded ${ago(new Date(level.created_at))}`">
        <strong>Field summary</strong>
        <div v-for="field in level.summary">

          <div style="display: inline;" class='usefulness' :class="{unique: field.unique, exists_on_all: field.exists_on_all}">
            <span v-if="field.unique">Unique</span>
            <span v-if="field.unique && field.exists_on_all"> and </span>
            <span v-if="field.exists_on_all">Exists on all</span>
          </div>

          <div style="display: inline;" >
            {{field.field_name}}
            ({{field.type}})
          </div>


        </div>
      </el-collapse-item>
    </el-collapse>

    <div v-else>No geodata found</div>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import ago from 's-ago';

  import {GEODATA_ACTIONS} from '@/store/geodata';
  import {GeodataLevelSummary} from '@/types';
  import UploadGeodata from '@/pages/edit/EditGeodata/UploadGeodata.vue';

  export default Vue.extend({
    components: {UploadGeodata},
    data() {
      return {
        ui_loading: false,
        ui_upload_visible: false,
        ui_active_levels: [],
      };
    },
    computed: {
      geodata_summaries(): GeodataLevelSummary[] {
        return this.$store.state.geodata_module.geodata_summaries
          .sort((a: GeodataLevelSummary, b: GeodataLevelSummary) => {
            return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
          });
      },
    },
    async mounted() {
      await this.check();
    },
    methods: {
      async check() {
        this.ui_loading = true;
        await this.$store.dispatch(GEODATA_ACTIONS.FETCH_GEODATA_SUMMARIES);
        this.ui_loading = false;
      },
      ago,
    },
  });
</script>

<style lang='scss' scoped>
  .unique {
    color: deeppink;
  }
  .exists_on_all {
    color: orange;
  }
  .unique.exists_on_all {
    color: green;
  }
</style>