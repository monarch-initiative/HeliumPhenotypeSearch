<template>
  <div class="card bg-light mb-3" style="height: 100%;">
    <div class="card-header"><strong>CommonsShare Data Assets</strong></div>
    <div class="card-body">
      <b-table
          small
          hover
          :items="fileHits"
          :fields="fields"
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
          <div v-for="mt in data.item.matching_terms">
            <span class="badge badge-info">{{mt.label}} <br/> {{mt.id}}</span>
          </div>

        </template>
        <template slot="other_terms" slot-scope="data">
          <div v-for="oterm in data.item.other_terms">
            <div
                class="py-1">
              <span class="badge badge-secondary">{{oterm.label}} <br/> {{oterm.id}}</span>
            </div>
          </div>
        </template>
      </b-table>
      <div v-if="!fileHits.length">
        No assets
      </div>
    </div>
  </div>
</template>
<script>
  import heartDisease from "@/assets/json/hdDescendents.json";
  import skeletalDisease from "@/assets/json/sdDescendents.json";

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
            label: 'Title',
            class: 'fieldHeaders',
          },
          {
            key: 'location',
            label: 'Location',
            class: 'fieldHeaders',
          },
          {
            key: 'file',
            label: 'File',
            class: 'fieldHeaders',
          },
          {
            key: 'matching_tag',
            label: 'Matching Term',
            class: 'fieldHeaders',
          },
          {
            key: 'other_terms',
            label: 'Other Annotations',
            class: 'fieldHeaders',
          }
        ],
        fileHits: [],
        assetMappings: [{
          'location': 'Helium',
          'name': 'NWD100953.recab.cram.crai',
          'study': 'study',
          'terms': [{'id': 'HP:0001166', 'label': 'Arachnodactyly'},
            {'id': 'HP:0004935', 'label': 'Pulmonary artery atresia'},
            {'id': 'MP:0000548', 'label': 'long limbs'},
            {'id': 'HP:0030148', 'label': 'Heart murmur'}],
          'url': 'https://helium.commonsshare.org/resource/36b009e9ecfa42b0bc51bb8c56394131/'
        },
          {
            'location': 'Calcium',
            'name': 'NWD100953.recab.cram',
            'study': 'study',
            'terms': [{'id': 'HP:0001166', 'label': 'Arachnodactyly'},
              {'id': 'HP:0004935', 'label': 'Pulmonary artery atresia'},
              {'id': 'MP:0000548', 'label': 'long limbs'},
              {'id': 'HP:0030148', 'label': 'Heart murmur'}],
            'url': 'https://helium.commonsshare.org/resource/bf4e8824d1de43928b10ef0e15384394/'
          },
          {
            'location': 'Helium',
            'name': 'NWD119836.recab.cram.crai',
            'study': 'study',
            'terms': [
              {
                'id': 'MONDO:0005068',
                'label': 'myocardial infarction (disease)'
              },
              {
                'id': 'HP:0000819', 'label': 'diabetes'
              },
              {'id': 'HP:0001640', 'label': 'Cardiomegaly'}],
            'url': 'https://helium.commonsshare.org/resource/3915cf1a65a54c4a8899e89b2d44a578/'
          },
          {
            'location': 'Calcium',
            'name': 'NWD119836.recab.cram',
            'study': 'study',
            'terms': [
              {
                'id': 'MONDO:0005068',
                'label': 'myocardial infarction (disease)'
              },
              {'id': 'HP:0000819', 'label': 'diabetes'},
              {'id': 'HP:0001640', 'label': 'Cardiomegaly'}],
            'url': 'https://helium.commonsshare.org/resource/ae80aa721b28427a987e96ebc64a6114/'
          },
          {
            'location': 'Helium',
            'name': 'NWD119844.recab.cram.crai',
            'study': 'study',
            'terms': [
              {'id': 'HP:0030148', 'label': 'Heart murmur'},
              {'id': 'HP:0001263', 'label': 'Global developmental delay'}
              ],
            'url': 'https://helium.commonsshare.org/resource/1af99a27bf5e4b90b8f487bd40442ff3/'
          },
          {
            'location': 'Calcium',
            'name': 'NWD119844.recab.cram',
            'study': 'study',
            'terms': [
              {'id': 'HP:0030148', 'label': 'Heart murmur'},
              {'id': 'HP:0001263', 'label': 'Global developmental delay'}
              ],
            'url': 'https://helium.commonsshare.org/resource/7b86bfbac139412ba3434d8bd4afd845/'
          },
          {
            'location': 'Helium',
            'name': 'NWD136397.recab.cram.crai',
            'study': 'study',
            'terms': [
              {'id': 'MONDO:0005068', 'label': 'heart attack'},
              {'id': 'HP:0001640', 'label': 'enlarged heart'}
              ],
            'url': 'https://helium.commonsshare.org/resource/57d1b9408a404b50b1efe7ea6a205901/'
          },
          {
            'location': 'Calcium',
            'name': 'NWD136397.recab.cram',
            'study': 'study',
            'terms': [{'id': 'MONDO:0005068', 'label': 'heart attack'},
              {'id': 'HP:0001640', 'label': 'enlarged heart'}],
            'url': 'https://helium.commonsshare.org/resource/934f087a36064488b729a49defccac75/'
          },
          {
            'location': 'Helium',
            'name': 'NWD146103.recab.cram',
            'study': 'study',
            'terms': [
              {'id': 'HP:0001161', 'label': 'extra finger'},
              {'id': 'HP:0000822', 'label': 'high blood pressure'}
              ],
            'url': 'https://helium.commonsshare.org/resource/81aaff6435814b3bb23109b413aa0372/'
          },
          {
            'location': 'Calcium',
            'name': 'NWD146103.recab.cram.crai',
            'study': 'study',
            'terms': [
              {'id': 'HP:0001161', 'label': 'extra finger'},
              {'id': 'HP:0000822', 'label': 'high blood pressure'}
              ],
            'url': 'https://helium.commonsshare.org/resource/2ad0ef6b91ad48608980ac07341ef004/'
          }]
      };
    },
    mounted() {
      this.fileHits = [];
      this.checkMappings();
    },
    watch: {
      term() {
        this.fileHits = [];
        this.checkMappings();
      },
    },
    methods: {
      checkMappings() {
        if (this.term.id === heartDisease.curie) {
          this.queryMeta(heartDisease);
        }
        else if (this.term.id === skeletalDisease.curie) {
          this.queryMeta(skeletalDisease);
        }
        else if (heartDisease.descendents.includes(this.term.id)) {
          this.queryMeta(heartDisease);
        }
        else if (skeletalDisease.descendents.includes(this.term.id)) {
          this.queryMeta(skeletalDisease);
        }
      },
      queryMeta(closure) {
        this.assetMappings.forEach(elem => {
          elem.matching_terms = [];
          elem.other_terms = [];
          elem.terms.forEach(inem => {
            if (closure.descendents.includes(inem.id)) {
              elem.matching_terms.push(inem);
            } else {
              elem.other_terms.push(inem);
            }
          });
          if (elem.matching_terms.length) {
            this.fileHits.push(elem);
          }
        })
      },
    },
  };
</script>
<style>
  .fieldHeaders { font-weight: bold; }
</style>


