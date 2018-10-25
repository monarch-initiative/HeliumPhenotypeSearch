<template>
  <div class="card">
    <div class="card-header"> Data Commons Assets</div>
    <div class="card-body">
      <div v-if="assets" v-for="fh in fileHits">
        <a :href="fh.url">{{fh.name}}</a><span class="badge badge-primary badge-success badge-large mx-5">{{fh.term}}</span>
      </div>
      <div v-else>
        No assets
      </div>
    </div>
  </div>
</template>
<script>
  import heartDisease from "@/assets/json/heartDisease.json";
  import skeletalDisease from "@/assets/json/skeletalDisease.json";
  const jsSearch = require("js-search");

  export default {
    name: "AssetsView",
    props: {
      term: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        fileHits: [],
        assets: false,
        assetMappings: [
          {
            "name": "NWD100953.recab.cram.crai",
            "terms": ["HP:0001166", "HP:0004935", "MP:0000548", "HP:0030148"],
            "url": "https://helium.commonsshare.org/resource/36b009e9ecfa42b0bc51bb8c56394131/",
            "study": 'study'
          },
          {
            "name": "NWD100953.recab.cram",
            "url": "https://helium.commonsshare.org/resource/bf4e8824d1de43928b10ef0e15384394/",
            "terms": ["HP:0001166", "HP:0004935", "MP:0000548", "HP:0030148"],
            "study": 'study'
          },
          {
            "name": "NWD119836.recab.cram.crai",
            "terms": ["MONDO:0005068", "diabetes", "HP:0001640"],
            "url": "https://helium.commonsshare.org/resource/3915cf1a65a54c4a8899e89b2d44a578/",
            "study": 'study'
          },
          {
            "name": "NWD119836.recab.cram",
            "url": "https://helium.commonsshare.org/resource/ae80aa721b28427a987e96ebc64a6114/",
            "terms": ["MONDO:0005068", "diabetes", "HP:0001640"],
            "study": 'study'
          },
          {
            "name": "NWD119844.recab.cram.crai",
            "terms": ["HP:0030148", "HP:0001263"],
            "url": "https://helium.commonsshare.org/resource/1af99a27bf5e4b90b8f487bd40442ff3/",
            "study": 'study'
          },
          {
            "name": "NWD119844.recab.cram",
            "url": "https://helium.commonsshare.org/resource/7b86bfbac139412ba3434d8bd4afd845/",
            "terms": ["HP:0030148", "HP:0001263"],
            "study": 'study'
          },
          {
            "name": "NWD136397.recab.cram.crai",
            "terms": ["heart attack", "enlarged heart"],
            "url": "https://helium.commonsshare.org/resource/57d1b9408a404b50b1efe7ea6a205901/",
            "study": 'study'
          },
          {
            "name": "NWD136397.recab.cram",
            "url": "https://helium.commonsshare.org/resource/934f087a36064488b729a49defccac75/",
            "terms": ["heart attack", "enlarged heart"],
            "study": 'study'
          },
          {
            "name": "NWD146103.recab.cram",
            "url": "https://helium.commonsshare.org/resource/81aaff6435814b3bb23109b413aa0372/",
            "terms": ["extra finger", "high blood pressure"],
            "study": 'study'
          },
          {
            "name": "NWD146103.recab.cram.crai",
            "terms": ["extra finger", "high blood pressure"],
            "url": "https://helium.commonsshare.org/resource/2ad0ef6b91ad48608980ac07341ef004/",
            "study": 'study'
          }],
      };
    },
    mounted() {
      this.setSearchIndexes();
      this.checkMappings();

    },
    watch: {
      term() {
        this.fileHits = [];
        this.setSearchIndexes();
        this.checkMappings();
      }
    },
    methods: {
      checkMappings() {
        if (this.term.curie === heartDisease.curie) {
          heartDisease.descendents.forEach(term => this.queryMeta(term));
        }
        if (this.term.curie === skeletalDisease.curie) {
          skeletalDisease.descendents.forEach(term => this.queryMeta(term));
        }
      },
      setSearchIndexes() {
        this.search = new jsSearch.Search('name');
        this.search.addIndex('terms');
        this.search.addIndex('url');
        this.search.addIndex('study');
      },
      queryMeta(term) {
        this.search.addDocuments(this.assetMappings);
        const results = this.search.search(term);
        if (results.length){
          results.forEach(hit => {
            hit.term = term;
            this.fileHits.push(hit);
          });
          this.assets = true;
        }
      }
    },
  };
</script>
<style></style>


