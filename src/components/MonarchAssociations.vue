<template>
  <div class="card  bg-light">
    <div class="card-header"><strong>Monarch Knowledge Association</strong>
      <img style="max-height: 20px; float:right" src="../assets/img/monarch-logo.png">
    </div>
    <div class="card-body">
      <div class="p-2"><strong>Preferred Label:</strong><br/>
        <a class="hlink" v-bind:href="monarchUrl"><h2>{{dataPacket.label}} <font-awesome-icon size="xs" icon="external-link-alt"/></h2></a>
      </div>
      <div class="p-2"><strong>Identifier:</strong><br/><span class="badge badge-primary badge-info badge-large">{{dataPacket.id}}</span></div>
      <div class="p-2"><strong>Description:</strong><br/>{{dataPacket.description}}</div>
      <div class="p-2"><strong>Synonyms:</strong><br/>
        <h5> <span class="badge badge-info badge-large mx-1"
                   v-for="syn in dataPacket.synonyms">
          {{syn.val}}</span></h5>
      </div>
      <div class="p-2"><strong>Xrefs:</strong><br/>
        <h5> <span
            class="badge badge-secondary badge-large mx-1"
            v-for="eq in xRefs">
          {{eq}}</span>
        </h5>
      </div>
      <div class="p-2">
        <table width="100%">
          <col width="60%">
          <col width="20%">
          <col width="20%">
          <tr>
            <th><strong>Association</strong></th>
            <th><strong>Count</strong></th>
          </tr>
          <tr style="height: 45px" v-for="(value, index) in dataPacket.counts">
            <td>{{firstCap(index)}}</td>
            <td><a target="_blank" :href="monarchUrlAnchored(index)">{{value.totalCount}}</a>
            </td>
            <td><span style="float:right" v-if="index==='literature'">
              <a target="_blank" class="btn btn-outline-info btn-sm my-2" v-b-tooltip title="Retrieves co-mentions of genes, phentoypes, diseases, variants, etc. in the literature" :href="hippoUrl">Hippo Literature Query</a></span></td>
          </tr>
        </table>
      </div>
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
        xRefs: '',
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
      this.getXrefs(this.curie);
    },
    watch: {
      curie: function () {
        this.fetchData(this.curie, this.category);
        this.getXrefs(this.curie);
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
      async getXrefs(nodeID) {
        try {
          const searchResponse = await BL.getDbXrefs(nodeID);
          this.xRefs = searchResponse.data.nodes[0].meta["http://www.geneontology.org/formats/oboInOwl#hasDbXref"];
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
  const thing = {
    "nodes": [{
      "id": "MONDO:0005267",
      "lbl": "heart disease",
      "meta": {
        "types": ["disease", "cliqueLeader", "Node", "Class"],
        "synonym": ["disease of heart", "Heart Disorder", "heart disease", "cardiac disease", "disorder of heart", "Heart Disease", "Heart trouble"],
        "http://www.geneontology.org/formats/oboInOwl#id": ["MONDO:0005267"],
        "http://www.geneontology.org/formats/oboInOwl#hasExactSynonym": ["disease of heart", "Heart Disorder", "heart disease", "cardiac disease", "Heart Disease", "Heart trouble"],
        "http://www.geneontology.org/formats/oboInOwl#hasDbXref": ["ICD9:429.9", "NCIT:C3079", "EFO:0003777", "SCTID:56265001", "MESH:D006331", "ICD10:I51.9", "DOID:114", "COHD:321588", "UMLS:C0018799"],
        "http://www.w3.org/2000/01/rdf-schema#label": ["heart disease"],
        "http://www.geneontology.org/formats/oboInOwl#hasRelatedSynonym": ["disorder of heart"],
        "definition": ["A disease involving the heart."],
        "http://purl.obolibrary.org/obo/IAO_0000115": ["A disease involving the heart."],
        "category": ["disease"]
      }
    }], "edges": [], "meta": {}
  }
</script>
<style >
  * {
    color: #00526d;
    font: 1.01em "Fira Sans", sans-serif;;
  }

  .hlink{
    color: #00526d;
  }
</style>
