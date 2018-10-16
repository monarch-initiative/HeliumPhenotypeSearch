<template>
  <div class="card">
    <div class="card-header">Monarch Data

    </div>
    <div class="card-body">

      <div class="p-2"><strong>Label:</strong><br/><a v-bind:href="monarchUrl">{{dataPacket.label}}</a></div>
      <div class="p-2"><strong>Identifier:</strong><br/>{{dataPacket.id}}</div>
      <div class="p-2"><strong>Description:</strong><br/>{{dataPacket.description}}</div>
      <div class="p-2"><strong>Associations:</strong>
        <div
            class="p-2"
            v-if="geneData"
        >
          Genes:
          {{geneData.data.associations.length}}
        </div>
        <div
            class="p-2"
            v-if="diseaseData"
        >
          Diseases:
          {{diseaseData.data.associations.length}}
        </div>
        <div
            class="p-2"
            v-if="variantData"
        >
          Variants:
          {{variantData.data.associations.length}}
        </div>
        <div
            class="p-2"
            v-if="genotypeData"
        >
          Genotypes:
          {{genotypeData.data.associations.length}}
        </div>
        <div
            class="p-2"
            v-if="phenotypeData"
        >
          Phenotypes:
          {{phenotypeData.data.associations.length}}
        </div>
        <div
            class="p-2"
            v-if="literatureData"
        >
          Literature:
          {{literatureData.data.associations.length}}
        </div>
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
        return `https://monarch-initiative.github.io/monarch-ui/${this.category}/${this.curie}`
      }
    },
    mounted(){
      this.fetchData(this.curie, this.category);
      this.fetchAssociations(this.category, this.curie, 'gene');
      this.fetchAssociations(this.category, this.curie, 'disease');
      this.fetchAssociations(this.category, this.curie, 'genotype');
      this.fetchAssociations(this.category, this.curie, 'literature');
      this.fetchAssociations(this.category, this.curie, 'variant');
    },
    watch: {
      curie: function () {
        this.fetchData(this.curie, this.category);
        this.fetchAssociations(this.category, this.curie, 'gene');
        this.fetchAssociations(this.category, this.curie, 'disease');
        this.fetchAssociations(this.category, this.curie, 'genotype');
        this.fetchAssociations(this.category, this.curie, 'literature');
        this.fetchAssociations(this.category, this.curie, 'variant');
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
          const searchResponse = await BL.getNodeAssociations(nodeType, nodeID, cardType, {'rows': 50000});
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
    },
  };
</script>
<style></style>
