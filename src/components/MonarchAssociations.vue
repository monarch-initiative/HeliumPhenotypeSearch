<template>
  <div class="card">
    <div class="card-header">Monarch Data
    </div>
    <div class="card-body">
      <div class="p-2"><strong>Preferred Label:</strong><br/>
        <a v-bind:href="monarchUrl"><h2>{{dataPacket.label}}</h2></a>
      </div>
      <div class="p-2"><strong>Identifier:</strong><br/>{{dataPacket.id}}</div>
      <div class="p-2"><strong>Description:</strong><br/>{{dataPacket.description}}</div>
      <div class="p-2"><strong>Synonyms:</strong><br/>
        <h5> <span class="badge badge-primary badge-info badge-large mx-1"
                   v-for="syn in dataPacket.synonyms">
          {{syn.val}}</span></h5>
      </div>
      <table style="width:100%">
        <th>Association</th>
        <th>Count</th>
        <tr v-for="(value, index) in dataPacket.counts">
          <td>{{index}}</td>
          <td><a :href="monarchUrlAnchored(index)">{{value.totalCount}}</a></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import * as BL from '@/api/BioLink';

  export default {
    name: 'MonarchAssociations',
    props: {
      curie: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        fields: ['Association Type', 'Count'],
        items: [],
        geneData: '',
        genotypeData: '',
        variantData: '',
        diseaseData: '',
        literatureData: '',
        phenotypeData: '',
        dataPacket: '',
      };
    },
    computed: {
      monarchUrl() {
        return `https://monarchinitiative.org/${this.category}/${this.curie}`;
      },
      hippoUrl() {
        return `http://hippo.monarchinitiative.org/#/query/${this.curie}`;
      },
    },
    mounted(){
      this.fetchData(this.curie, this.category);
    },
    watch: {
      curie: function () {
        this.fetchData(this.curie, this.category);
      }
    },
    methods: {
      async fetchData(nodeID, nodeType) {
        try {
          const searchResponse = await BL.getNodeSummary(nodeID, nodeType);
          this.dataPacket = searchResponse;
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      monarchUrlAnchored(cardType) {
        return `https://monarchinitiative.org/${this.category}/${this.curie}#${cardType}s`;
      },
    },
  };
</script>
<style></style>
