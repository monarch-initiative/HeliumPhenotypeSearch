<template>

  <div class="card bg-light" style="height: 100%">
    <div class="card-header"><strong>Monarch Association Counts</strong>
      <img style="max-height: 20px; float:right" src="../assets/img/monarch-logo.png">
    </div>
    <div class="card-body">
    <b-table
        small
        hover
        :items="items"
        :fields="fields"
    >
      <!-- A virtual column -->
      <template slot="association" slot-scope="data">
        <div class="py-2">{{firstCap(data.item.association)}}</div>
      </template>
      <template slot="count" slot-scope="data">
        <div class="py-2">
          <a target="_blank" :href="monarchUrlAnchored(data.item.count.url)">{{data.item.count.count}}</a></div>
      </template>
    </b-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MonarchCounts',
    props: {
      counts: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        fields: [
          {key: 'association', label: 'Association', class: 'bold'},
          {key: 'count', label: 'Count', class: 'bold'}
        ]
      };
    },
    computed: {
      items() {
        return Object.entries(this.counts.counts).map(elem => this.dictToList(elem[0], elem[1]));
      }
    },
    methods: {
      firstCap(term) {
        return  term.charAt(0).toUpperCase() + term.substr(1);
      },
      monarchUrlAnchored(cardType) {
        let url = `https://monarchinitiative.org/${this.counts.categories[0].toLowerCase()}/${this.counts.id}#${cardType}s`;
        if (cardType === 'literature') {
          url = url.substring(0, url.length - 1);
        }
        return url;
      },
      dictToList(key, value) {
        return {
          'association': key,
          'count': {'url': key, 'count': value['totalCount']},
        }
      },
    }
  };
</script>
<style>
  .bold {
    font-weight: bold;
  }
</style>
