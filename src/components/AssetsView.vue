<template>
  <div class="card bg-light mb-3" style="height: 100%;">
    <div class="card-header"><strong>CommonsShare Assets</strong></div>
    <div class="card-body">
      <b-table
          small
          hover
          :items="fileHits"
          :fields="fields"
          @row-clicked="selectCount"
      >
        <!-- A virtual column -->
        <template slot="title" slot-scope="data">
          <div>{{data.item.name.split('.')[0]}}</div>
        </template>
        <template slot="location" slot-scope="data">
          {{data.item.location}}
        </template>
        <template slot="file" slot-scope="data">
          <a :href="data.item.url">{{data.item.name}}</a>
        </template>
        <template slot="matching_tag" slot-scope="data">
          <span v-if="data.item.termLabel"
                  class="badge badge-primary badge-info badge-large"
          style="text-align: left">
          {{data.item.termLabel}}<br/>
          {{data.item.term}}</span>
          <span v-else
                class="badge badge-primary badge-info badge-large"
                style="text-align: left"
          >{{data.item.term}}<br/></span>
        </template>
        <template slot="other_terms" slot-scope="data">
          <div v-for="oterm in data.item.mapped">
            <div
                class="py-1">
            <span class="badge badge-primary">
            {{oterm}}
            </span>
            </div>
          </div>
        </template>
      </b-table>
      <div v-if="!assets">
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
        fields: [
          {
            key: 'title',
            label: 'Title'
          },
          {
            key: 'location',
            label: 'Location'
          },
          {
            key: 'file',
            label: 'File',
          },
          {
            key: 'matching_tag',
            label: 'Matching Term',
          },
          {
            key: 'other_terms',
            label: 'Other Terms(s)',
          }
        ],
        fileHits: [],
        fileKeys: [],
        assets: false,
        termMap: {
          "HP:0001166": 'Arachnodactyly',
          "HP:0004935": 'Pulmonary artery atresia',
          "MP:0000548": 'long limbs',
          "HP:0030148": "Heart murmur",
          "MONDO:0005068": 'myocardial infarction (disease)',
          "MONDO:0001640": 'gonococcal spondylitis',
          "HP:0001263": 'histoplasmosis retinitis',
          "MONDO:0005015": 'diabetes mellitus (disease)',
          "HP:0001658": "Myocardial infarction",
          "HP:0001640": 'Cardiomegaly',
          "HP:0001161": "Hand polydactyly",
          "HP:0005068": "Absent styloid process of ulna",
        },
        assetMappings: [
          {
            "name": "NWD100953.recab.cram.crai",
            "terms": ["HP:0001166", "HP:0004935", "MP:0000548", "HP:0030148"],
            "url": "https://helium.commonsshare.org/resource/36b009e9ecfa42b0bc51bb8c56394131/",
            "study": 'study',
            "location": 'Helium'
          },
          {
            "name": "NWD100953.recab.cram",
            "url": "https://helium.commonsshare.org/resource/bf4e8824d1de43928b10ef0e15384394/",
            "terms": ["HP:0001166", "HP:0004935", "MP:0000548", "HP:0030148"],
            "study": 'study',
            "location": 'Calcium'
          },
          {
            "name": "NWD119836.recab.cram.crai",
            "terms": ["MONDO:0005068", "diabetes", "HP:0001640"],
            "url": "https://helium.commonsshare.org/resource/3915cf1a65a54c4a8899e89b2d44a578/",
            "study": 'study',
            "location": 'Helium'
          },
          {
            "name": "NWD119836.recab.cram",
            "url": "https://helium.commonsshare.org/resource/ae80aa721b28427a987e96ebc64a6114/",
            "terms": ["MONDO:0005068", "diabetes", "HP:0001640"],
            "study": 'study',
            "location": 'Calcium'
          },
          {
            "name": "NWD119844.recab.cram.crai",
            "terms": ["HP:0030148", "HP:0001263"],
            "url": "https://helium.commonsshare.org/resource/1af99a27bf5e4b90b8f487bd40442ff3/",
            "study": 'study',
            "location": 'Helium'
          },
          {
            "name": "NWD119844.recab.cram",
            "url": "https://helium.commonsshare.org/resource/7b86bfbac139412ba3434d8bd4afd845/",
            "terms": ["HP:0030148", "HP:0001263"],
            "study": 'study',
            "location": 'Calcium'
          },
          {
            "name": "NWD136397.recab.cram.crai",
            "terms": ["heart attack", "enlarged heart"],
            "url": "https://helium.commonsshare.org/resource/57d1b9408a404b50b1efe7ea6a205901/",
            "study": 'study',
            "location": 'Helium'
          },
          {
            "name": "NWD136397.recab.cram",
            "url": "https://helium.commonsshare.org/resource/934f087a36064488b729a49defccac75/",
            "terms": ["heart attack", "enlarged heart"],
            "study": 'study',
            "location": 'Calcium'
          },
          {
            "name": "NWD146103.recab.cram",
            "url": "https://helium.commonsshare.org/resource/81aaff6435814b3bb23109b413aa0372/",
            "terms": ["extra finger", "high blood pressure"],
            "study": 'study',
            "location": 'Helium'
          },
          {
            "name": "NWD146103.recab.cram.crai",
            "terms": ["extra finger", "high blood pressure"],
            "url": "https://helium.commonsshare.org/resource/2ad0ef6b91ad48608980ac07341ef004/",
            "study": 'study',
            "location": 'Calcium'
          }],
      };
    },
    mounted() {
      this.fileHits = [];
      this.fileKeys =[];
      this.setSearchIndexes();
      this.checkMappings();
    },
    watch: {
      term() {
        this.fileHits = [];
        this.fileKeys =[];
        this.setSearchIndexes();
        this.checkMappings();
      },
    },
    methods: {
      checkMappings() {
        if (this.term.id === heartDisease.curie) {
          console.log('heart curie');
          heartDisease.descendents.forEach(term => this.queryMeta(term));
        }
        else if (this.term.id === skeletalDisease.curie) {
          console.log('skeletal curie');
          skeletalDisease.descendents.forEach(term => this.queryMeta(term));
        }
        else if (heartDisease.descendents.includes(this.term.label.toLowerCase())) {
          console.log('heart descendents');
          heartDisease.descendents.forEach(term => this.queryMeta(term));
        }
        else if (skeletalDisease.descendents.includes(this.term.label.toLowerCase())) {
          console.log('skeletal descendents');
          skeletalDisease.descendents.forEach(term => this.queryMeta(term));
        }

      },
      setSearchIndexes() {
        this.search = new jsSearch.Search('name');
        this.search.indexStrategy = new jsSearch.ExactWordIndexStrategy();
        this.search.addIndex('terms');
        this.search.addIndex('url');
        this.search.addDocuments(this.assetMappings);
      },
      queryMeta(term) {
        let searchTerm = term;
        if (!term.includes(':')) {
            searchTerm = searchTerm.toLowerCase();
        }
        const results = this.search.search(searchTerm);
        if (results.length){
          results.forEach(hit => {
            hit.term = term;
            hit.termLabel = this.curiePrimaryLabel(term);
            let otherTerms = hit.terms.filter(elem => term !== elem);
            hit.mapped = otherTerms.map(elem => this.curieOtherLabel(elem));
            hit.mapped = hit.mapped.filter(e => typeof e === 'string' && e);
            console.log(this.checkFileHits(hit.name));
            if (!this.checkFileHits(hit.name)) {

              this.fileHits.push(hit);
            }
          });
          this.assets = true;
        }
      },
      curieOtherLabel(term) {
        if (term in this.termMap) {
          return this.termMap[term]
        } else {
          return term
        }
      },
      curiePrimaryLabel(term) {
        if (term in this.termMap) {
          return this.termMap[term]
        } else {
          return ''
        }
      },
      selectCount(row) {
        console.log(row);
      },
      checkFileHits(hitName) {
        let count = 0;
        this.fileHits.forEach(elem => {
          if (hitName === elem.name) {
            count += 1;
          }
        });
        return count;
      },
    },
  };
</script>
<style></style>


