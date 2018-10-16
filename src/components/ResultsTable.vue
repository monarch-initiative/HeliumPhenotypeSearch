<template>
  <div class="py-2">
    {{items.length}} total terms found
    <b-table
        small
        striped
        hover
        bordered
        :per-page=10
        :current-page="currentPage"
        :items="items"
        :fields="fields"
        @row-clicked="emitSelection"
    >
      <!-- A virtual column -->
      <template slot="index" slot-scope="data">
        {{data.index + 1}}
      </template>
      <!-- A custom formatted column -->
      <template slot="data" slot-scope="data">
        {{data.value.match}}
      </template>
      <!-- A virtual composite column -->
      <template slot="data" slot-scope="data">
        {{data.value.category}}
      </template>
      <template slot="data" slot-scope="data">
        {{data.value.curie}}
      </template>
    </b-table>
    <b-pagination
        align="center"
        size="md"
        :total-rows="items.length"
        v-model="currentPage"
        :per-page="10">
    </b-pagination>
  </div>
</template>
<script>
  import * as BL from '@/api/BioLink';

  export default {
    name: 'ResultTable',
    props: {
      value: {
        type: Object,
        required: true,
      }
    },
    computed : {
      searchTerm () {
        return this.value.searchTerm;
      },
      searchCategory () {
        return this.value.category;
      },
    },
    data() {
      return {
        currentPage: 1,
        fields: ['index', 'match', 'category', 'curie',],
        items: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const selected = this.searchCategory;
          const searchResponse = await BL.getSearchTermSuggestions(this.searchTerm, selected, 500);
          this.items = [];
          this.current = -1;
          searchResponse.docs.forEach((elem) => {
            const resultPacket = {
              match: elem.match,
              category: this.categoryMap(elem.category),
              taxon: this.checkTaxon(elem.taxon_label),
              curie: elem.id,
              highlight: elem.highlight,
              has_hl: elem.has_highlight
            };
            this.items.push(resultPacket);
          });
          this.open = true;
          this.loading = false;
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      categoryMap(catList) {
        const validCats = {
          'gene': 'gene',
          'variant locus': 'variant',
          'Phenotype': 'phenotype',
          'genotype': 'genotype',
          'disease': 'disease'
        };
        const categoryObj = catList.reduce((map, cat) => {
          const catKey = validCats[cat];
          if (catKey) {
            map[catKey] = catKey;
          }
          return map;
        }, {});
        return categoryObj.gene
          || categoryObj.variant
          || Object.keys(categoryObj).join(',');
      },
      checkTaxon(taxon) {
        if (typeof taxon === 'string') {
          return taxon;
        }
        return null;
      },
      emitSelection(row) {
        this.$emit('resultInterface', row);
      },
    },
  };
</script>
<style></style>
