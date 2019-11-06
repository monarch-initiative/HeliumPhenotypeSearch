<template>
  <div class="home container-fluid p-4">
    <div class="card bg-light mb-2">
      <div class="card-body"><h2><strong>Helium Phenotype Search</strong></h2>
        <monarch-autocomplete
            :home-search="true"
            :auto-focus="true"
            @interface="emitInterface"
        />
      </div>
    </div>
    <div v-if="selection" class="row">
      <div class="col-12">
        <monarch-associations
            :curie="selection.curie"
            :category="selection.category"
        ></monarch-associations>
      </div>
    </div>
    <div v-if="selection" class="row">
      <div class="col-4" style="padding-right: 4px; padding-top: 8px">
        <monarch-counts
            :curie="selection.curie"
            :category="selection.category"
        >
        </monarch-counts>
      </div>
      <div class="col-8" style="padding-left: 4px; padding-top: 8px">
        <assets-view
            :term="selection"
        >
        </assets-view>
      </div>
    </div>

    <div v-if="!selection && searchMore">
      <results-table
          @resultInterface="emitRowInterface"
          :value="searchMore"
      >
      </results-table>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import MonarchAutoComplete from '@/components/MonarchAutocomplete.vue';
import AssetsView from '@/components/AssetsView.vue';
import MonarchAssociations from "@/components/MonarchAssociations.vue";
import ResultsTable from "@/components/ResultsTable.vue";
import MonarchCounts from "@/components/MonarchCounts.vue";

import * as BL from '@/api/BioLink';

export default {
  name: 'home',
  data() {
    return {
      exampleUrls: {
        'example1': {
          'name':'Abnormality of skeletal morphology',
          'id': '/HP:0011842'
        },
        'example2': {
          'name':'heart disease',
          'id': '/MONDO:0005267'
        },
      },
      selection: "",
      searchMore: "",
      selected: false,
    }
  },
  components: {
    'monarch-associations': MonarchAssociations,
    'monarch-autocomplete': MonarchAutoComplete,
    'assets-view': AssetsView,
    'results-table': ResultsTable,
    'monarch-counts': MonarchCounts,
  },
  mounted(){
    if (this.$route.params.id) {
      this.changeRouted();
    }
  },
  watch: {
    '$route.params.id'() {
      if (this.$route.params.id) {
        this.changeRouted();
      }
    },
  },
  methods: {
    async fetchObjectData(curie) {
      try {
        this.selection = "";
        const searchResponse = await BL.getNodeLabelByCurie(curie);
        this.selection = this.parseObjectData(searchResponse);
      }
      catch (e) {
        console.log('nodeResponse ERROR', e, this);
      }
    },
    parseObjectData(objectData) {
      return {
        category: objectData.data.category.toString(),
        curie: objectData.data.id,
        match: objectData.data.label,
      }
    },
    emitRowInterface(payload) {
      this.$router.push(`/${payload.curie}`);
    },
    emitInterface(payload) {
      if (payload.selected) {
        this.$router.push(`/${payload.curie}`);
      } else {
        this.$router.push(`/`);
        this.selection = "";
        this.searchMore = payload;
      }
    },
    changeRouted() {
      this.fetchObjectData(this.$route.params.id);
    }
  },
}
</script>
<style>

</style>
