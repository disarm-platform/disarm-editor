<template>
  <div v-loading="ui_loading">
    Geodata summary
    <ul v-if="geodata_summaries.length">
      <li v-for="level in geodata_summaries">
        {{level.level_name}}
        <template v-for="field in level.summary">
          <div>
            {{field.field_name}}
            ({{field.type}})
            Unique: {{field.unique}}
            Exists on all: {{field.exists_on_all}}
          </div>
        </template>
      </li>
    </ul>

    <div v-else>No geodata found</div>


    <UploadGeodata></UploadGeodata>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {GEODATA_ACTIONS} from '@/store/geodata';
  import {GeodataLevelSummary} from '@/types';
  import UploadGeodata from '@/pages/edit/EditGeodata/UploadGeodata.vue';

  export default Vue.extend({
    components: {UploadGeodata},
    data() {
      return {
        ui_loading: false,
      };
    },
    computed: {
      geodata_summaries(): GeodataLevelSummary[] {
        return this.$store.state.geodata_module.geodata_summaries;
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
    },
  });
</script>

<style lang='scss' scoped>

</style>