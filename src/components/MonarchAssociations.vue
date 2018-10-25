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

      <div class="p-2">
        <table style="width:100%">
        <col width="35%">
        <col width="65%">
        <tr>
          <th>Associations</th>
          <th>Count</th>
        </tr>
        <tr v-if="geneData">
          <td>Genes</td>
          <td
              class="p-2"
          >
            <a v-bind:href="monarchUrlAnchored('genes')">
              {{geneData.data.associations.length}}
            </a>
          </td>
        </tr>
        <tr v-if="diseaseData">
          <td>Diseases</td>
          <td
              class="p-2"
          >
            <a v-bind:href="monarchUrlAnchored('diseases')">
              {{diseaseData.data.associations.length}}
            </a>
          </td>
        </tr>
        <tr v-if="variantData">
          <td>Variants</td>
          <td
              class="p-2"
          >
            <a v-bind:href="monarchUrlAnchored('variants')">
              {{variantData.data.associations.length}}
            </a>
          </td>
        </tr>
        <tr v-if="genotypeData">
          <td>Genotypes</td>
          <td
              class="p-2"
          >
            <a v-bind:href="monarchUrlAnchored('genotypes')">
              {{genotypeData.data.associations.length}}
            </a>
          </td>
        </tr>
        <tr v-if="phenotypeData">
          <td>Phenotypes</td>
          <td
              class="p-2"
          >
            <a v-bind:href="monarchUrlAnchored('phenotypes')">
              {{phenotypeData.data.associations.length}}
            </a>
          </td>
        </tr>
        <tr v-if="literatureData">
          <td>Literature <a class="btn btn-outline-info btn-sm mx-2" :href="hippoUrl">HIPPO</a></td>
          <td
            class="p-2">
          <a v-bind:href="monarchUrlAnchored('literature')">
            {{literatureData.data.associations.length}}
          </a>
        </td></tr>
        <tr></tr>
      </table></div>
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
      this.fetchAssociations(this.category, this.curie, 'gene');
      this.fetchAssociations(this.category, this.curie, 'genotype');
      this.fetchAssociations(this.category, this.curie, 'literature');
      this.fetchAssociations(this.category, this.curie, 'variant');
      if (this.category !== 'phenotype') {
        this.fetchAssociations(this.category, this.curie, 'phenotype');
      }
      if (this.category !== 'disease') {
        this.fetchAssociations(this.category, this.curie, 'disease');
      }
    },
    watch: {
      curie: function () {
        this.fetchData(this.curie, this.category);
        this.fetchAssociations(this.category, this.curie, 'gene');
        this.fetchAssociations(this.category, this.curie, 'genotype');
        this.fetchAssociations(this.category, this.curie, 'literature');
        this.fetchAssociations(this.category, this.curie, 'variant');
        if (this.category !== 'phenotype') {
          this.fetchAssociations(this.category, this.curie, 'phenotype');
        }
        if (this.category !== 'disease') {
          this.fetchAssociations(this.category, this.curie, 'disease');
        }
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
      async fetchAssociations(nodeType, nodeID, cardType) {
        try {
          const searchResponse = await BL.getNodeAssociations(nodeType, nodeID, cardType, {'rows': 5000});
          if (cardType === 'gene') {
            this.geneData = searchResponse;
          }
          if (cardType === 'disease') {
            this.diseaseData = searchResponse;
          }
          if (cardType === 'genotype') {
            this.genotypeData = searchResponse;
          }
          if (cardType === 'literature') {
            this.literatureData = searchResponse;
          }
          if (cardType === 'variant') {
            this.variantData = searchResponse;
          }
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      monarchUrlAnchored(cardType) {
        return `https://monarchinitiative.org/${this.category}/${this.curie}#${cardType}`;
      },
    },
  };
</script>
<style></style>
