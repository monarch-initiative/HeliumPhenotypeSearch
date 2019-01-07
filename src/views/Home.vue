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
            @monarchInterface="monInterface"
        ></monarch-associations>
      </div>
    </div>
    <div class="row">
      <div class="col-4" style="padding-right: 4px; padding-top: 8px">
        <monarch-counts
            v-if="assetsReady"
            :curie="selection.curie"
            :category="selection.category"
        >
        </monarch-counts>
      </div>
      <div class="col-8" style="padding-left: 4px; padding-top: 8px">
        <assets-view
            v-if="assetsReady"
            :term="selection"
        >
        </assets-view>
      </div>
    </div>

    <div v-if="!selected && searchMore">
      <results-table
          @resultInterface="emitRowInterface"
          :value="searchMore"></results-table>
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
      closureData: {},
      selected: false,
      assetsReady: false,
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
    '$route.params.id'(id) {
      this.changeRouted();
    },
  },
  methods: {
    monInterface(payload) {
      this.closureData = payload;
      this.assetsReady = true;
      this.$router.push(`/${this.closureData.id}`);
    },
    emitRowInterface(payload) {
      this.selected = true;
      this.selection = payload;
      this.$router.push(`/${this.selection.curie}`);
    },
    emitInterface(payload) {
      if (payload.selected) {
        this.selected = true;
        this.selection = payload;
      } else {
        this.selected = false;
        this.searchMore = payload;
        this.selection = '';
      }
    },
    changeRouted() {
      let category = '';
      if (this.$route.params.id.includes('MONDO')) {
        category = 'disease';
      }
      if (this.$route.params.id.includes('HP')) {
        category = 'phenotype';
      }
      this.selection = {
        "curie": this.$route.params.id,
        "category": category,
      }
    }
  },
}
</script>
<style>

</style>
