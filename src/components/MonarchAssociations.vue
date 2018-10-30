<template>
  <div class="card  bg-light">
    <div class="card-header"><strong>Monarch Association Data</strong>
      <img style="max-height: 20px; float:right" src="../assets/img/monarch-logo.png">
    </div>
    <div class="card-body">
      <div class="p-2"><strong>Preferred Label:</strong><br/>
        <a v-bind:href="monarchUrl"><h2>{{dataPacket.label}} <font-awesome-icon size="xs" icon="external-link-alt"/></h2></a>
      </div>
      <div class="p-2"><strong>Identifier:</strong><br/><span class="badge badge-primary badge-info badge-large">{{dataPacket.id}}</span></div>
      <div class="p-2"><strong>Description:</strong><br/>{{dataPacket.description}}</div>
      <div class="p-2"><strong>Synonyms:</strong><br/>
        <h5> <span class="badge badge-info badge-large mx-1"
                   v-for="syn in dataPacket.synonyms">
          {{syn.val}}</span></h5>
      </div>
      <div class="p-2">
        <table width="50%">
          <col width="50%">
          <col width="50%">
          <tr>
            <th><strong>Association</strong></th>
            <th><strong>Count</strong></th>
          </tr>
          <tr v-for="(value, index) in dataPacket.counts">
            <td>{{firstCap(index)}}</td>
            <td><a :href="monarchUrlAnchored(index)">{{value.totalCount}}</a></td>
          </tr>
        </table>
      </div>
    <a class="btn btn-outline-info my-2" :href="hippoUrl">Hippo Semantic Literature Search</a>
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
          this.$emit('monarchInterface', this.dataPacket);
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      firstCap(term) {
        return  term.charAt(0).toUpperCase() + term.substr(1);
      },
      monarchUrlAnchored(cardType) {
        if (cardType === 'literature') {
          return `https://monarchinitiative.org/${this.category}/${this.curie}#${cardType}`;
        }
        else{
          return `https://monarchinitiative.org/${this.category}/${this.curie}#${cardType}s`;
        }
      },
    },
  };
</script>
<style>
  * {
    color: #00526d;
    font: 1.01em "Fira Sans", sans-serif;;
  }
</style>
