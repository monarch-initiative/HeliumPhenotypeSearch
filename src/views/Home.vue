<template>
  <div class="home container-fluid p-4">
    <h2>Helium Phenotype Search</h2>
    <monarch-autocomplete
        :home-search="true"
        :auto-focus="true"
        @interface="emitInterface"
    />
    <div class="btn btn-sm btn-outline-secondary" style="margin-top: 10px; margin-right: 3px">
      <router-link :to="exampleUrls.example1.id">{{exampleUrls.example1.name}}</router-link></div>
    <div class="btn btn-sm btn-outline-secondary" style="margin-top: 10px; margin-left: 3px">
      <router-link :to="exampleUrls.example2.id">{{exampleUrls.example2.name}}</router-link></div>
  <div v-if="selection" class="row py-2">
    <div class="col-6" style="padding-right: 4px">
      <monarch-associations
          :category="selection.category"
          :curie="selection.curie"
          @monarchInterface="monInterface"
      ></monarch-associations>
    </div>
    <div class="col-6" style="padding-left: 4px">
      <assets-view v-if="assetsReady" :term="closureData"></assets-view>
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
import ResultsTable from "@/components/ResultsTable.vue"

export default {
  name: 'home',
  data(){
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
    emitRowInterface(payload) {
      this.selected = true;
      this.selection = payload;

    },
    monInterface(payload) {
      this.closureData = payload;
      this.assetsReady = true;
      this.$router.push(`/${this.closureData.id}`);
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
