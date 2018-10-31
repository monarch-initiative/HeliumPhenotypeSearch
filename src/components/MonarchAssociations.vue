<template>
  <div class="card  bg-light">
    <div class="card-header"><strong>Monarch Knowledge Summary</strong>
      <img style="max-height: 20px; float:right" src="../assets/img/monarch-logo.png">
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4" style="padding-left: 20px">
          <h3><strong>Preferred Label: </strong> <br/> <a class="hlink" v-bind:href="monarchUrl"><span style="font-size: 1.2em">{{dataPacket.label}} </span>
            <font-awesome-icon size="xs" icon="external-link-alt"/>
          </a></h3>
        </div>
        <div class="col-4">
          <h3><strong>Primary Identifier:</strong></h3>
          <h3><span class="badge badge-primary badge-info">{{dataPacket.id}}</span></h3>
        </div>
        <div class="col-4">
          <h3><strong>Synonyms:</strong></h3>
          <h5><span class="badge badge-info badge-large mx-1"
                    v-for="syn in dataPacket.synonyms">
          {{syn.val}}
            </span>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-4" style="padding-left: 20px">
         <h3><strong>Description: </strong></h3>
          <br/><p style="font-size: 1.3em">{{dataPacket.description}}</p>
        </div>
        <div class="col-4">
          <h3><strong>Literature Co-Mentions: </strong></h3>
          <div class="mt-3">
          <a
              target="_blank"
              id="hippoLink"
              class="btn btn-outline-info btn-block my-2"

              :href="hippoUrl">Hippo Literature Query
          </a>
            <b-tooltip
                target="hippoLink"
                title="Retrieves co-mentions of genes, phentoypes, diseases, variants, etc. in the literature"
                placement="bottomright"></b-tooltip>
          </div>
        </div>
        <div class="col-4">
          <h3><strong>Cross References:</strong>
            <h5> <span
                class="badge badge-secondary badge-large mx-1"
                v-for="eq in xRefs">{{eq}}</span>
            </h5>
          </h3>
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
    },
  };
</script>
<style >
  h3 {
    color: #00526d;
  }

  /** {*/
    /*color: #00526d;*/
    /*font: 1.01em "Fira Sans", sans-serif;*/
  /*}*/

  .hlink{
    color: #383d41;
  }
  p{
    color: #383d41;
  }

</style>
