<template>
  <div class="card">
    <div class="card-header"> DataCommons Assets</div>
    <div class="card-body">
      <div v-if="curie in dcMappings"><ul v-for="file in dcMappings[curie].files">
        <li><a v-bind:href="file.url">{{file.name}}</a></li>
      </ul>
      </div>
      <div v-else>
        No DC Assets
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DataCommons',
    props: {
      curie: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        dcMappings: {
          'HP:0001658': {
            label: 'myocardial infarction',
            files: [{name: 'File1', url: 'http://dc.org/File1'}, {
              name: 'File2',
              url: 'http://dc.org/File2'
            }, {name: 'File3', url: 'http://dc.org/File3'}]
          },
          'HP:0004761': {
            label: 'Post-angioplasty coronary artery restenosis',
            files: [{name: 'File1', url: 'http://dc.org/File1'}, {
              name: 'File2',
              url: 'http://dc.org/File2'
            }, {name: 'File3', url: 'http://dc.org/File3'}]
          },
          'HP:0005145': {
            label: 'Post-angioplasty coronary artery restenosis',
            files: [{name: 'File1', url: 'http://dc.org/File1'}, {
              name: 'File2',
              url: 'http://dc.org/File2'
            }, {name: 'File3', url: 'http://dc.org/File3'}]
          },'HP:0005130': {
            label: 'Restrictive heart failure',
            files: [{name: 'File1', url: 'http://dc.org/File1'}, {
              name: 'File2',
              url: 'http://dc.org/File2'
            }, {name: 'File3', url: 'http://dc.org/File3'}]
          },
        }
      };
    },
  };
</script>
<style></style>
