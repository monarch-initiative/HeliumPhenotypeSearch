<template>
  <div  class="card bg-light mb-3" style="height: 100%;">
    <div class="card-header">
      <strong>CommonsShare Data Assets</strong>
      <img style="max-height: 20px; float:right" src="../assets/img/CommonsShare.png">
    </div>
    <div class="card-body">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      />
      <b-table
          small
          hover
          :items="items"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
      >
        <!-- A virtual column -->
        <template slot="study" slot-scope="data">
          <a :href="data.item.url">{{data.item.study}}</a>
        </template>
        <template slot="dataset" slot-scope="data">
          <a :href="data.item.dataset_url">{{data.item.dataset}}</a>
        </template>
        <template slot="matching_tag" slot-scope="data">
          <router-link :to="data.item.matching_tag.id"><span class="badge badge-primary badge-info">{{data.item.matching_tag.label}}<br/>{{data.item.matching_tag.id}}</span>
          </router-link>
        </template>
        <template slot="other_tags" slot-scope="data">
          <div v-for="oterm in data.item.other_tags">
            <div
                class="py-1">
              <router-link :to="oterm.id"><span class="badge badge-secondary">{{oterm.label}}<br/>{{oterm.id}}</span>
              </router-link>
            </div>
          </div>
        </template>
      </b-table>
      <div v-if="!items.length">
        No assets
      </div>
    </div>
  </div>
</template>
<script>
  import heartDisease from "@/assets/json/hdDescendents.json";
  import skeletalDisease from "@/assets/json/sdDescendents.json";
  import * as BL from '@/api/BioLink';
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
        termMap: {
          'NCIT:C17357': 'Gender',
          'NCIT:C17049': 'race',
          'NCIT:C25347': 'Height',
          'NCIT:C25208': 'Weight',
          'NCIT:C16358': 'body mass index',
          'NCIT:C100948': 'Waist Circumference',
          'NCIT:C100947': 'Hip Circumference',
          'NCIT:C17651': 'Waist-Hip Ratio',
          'NCIT:C2931': 'Cardiovascular disease',
          'NCIT:C27996': 'Myocardial infarction',
          'NCIT:C100085': 'Coronary Angiography',
          'NCIT:C51998': 'coronary artery bypass graft surgery',
          'NCIT:C50577': 'Heart Failure',
          'NCIT:C25298': 'Systolic Blood Pressure',
          'NCIT:C25299': 'Diastolic blood pressure',
          'NCIT:C3117': 'Hypertension',
          'NCIT:C92744': 'Blood Glucose Measurement',
          'NCIT:C74788': 'Insulin Measurement',
          'NCIT:C64849': 'Glycosylated Hemoglobin Measurement',
          'NCIT:C2985': 'Diabetes Mellitus',
          'NCIT:C50466': 'Atrial Fibrillation',
          'NCIT:C62087': 'Mean QRS Duration',
          'NCIT:C83501': 'QT interval',
          'NCIT:C83502': 'PR interval',
          'NCIT:C49677': 'heart rate',
          'NCIT:C50631': 'Left ventricular hypertrophy',
          'NCIT:C111285': 'Pacemaker ECG Assessment',
          'NCIT:C64796': 'Hematocrit Measurement',
          'NCIT:C64848': 'Hemoglobin Measurement',
          'NCIT:C51951': 'platelet count',
          'NCIT:C51946': 'Erythrocyte Count',
          'NCIT:C51948': 'Leukocyte Count',
          'NCIT:C64606 ': 'Fibrinogen Measurement',
          'NCIT:C81960': 'Factor VII Measurement',
          'NCIT:C81961': 'Factor VIII Measurement',
          'NCIT:C98799': 'von Willebrand Factor Measurement',
          'NCIT:C99537': 'Venous Thromboembolism',
          'NCIT:C64548': 'C-Reactive Protein Measurement',
          'NCIT:C74834': 'Interleukin 6 Measurement',
          'NCIT:C64547': 'Creatinine Measurement',
          'NCIT:C92290': 'Cystatin C Measurement',
          'NCIT:C74761': 'Albumin To Creatinine Protein Ratio Measurement',
          'NCIT:C90505': 'Glomerular Filtration Rate',
          'NCIT:C105588': 'Low Density Lipoprotein Cholesterol Measurement',
          'NCIT:C105587': 'High Density Lipoprotein Cholesterol Measurement',
          'NCIT:C64812': 'Triglyceride Measurement',
          'NCIT:C105586': 'Cholesterol Measurement',
          'NCIT:C111361': 'Forced Vital Capacity',
          'NCIT:C38084': 'Forced Expiratory Volume in 1 Second',
          'NCIT:C28397': 'asthma',
          'NCIT:C3199': 'Chronic Obstructive Pulmonary Disease',
          'NCIT:C26884': 'Sleep Apnea',
          'NCIT:C18270': 'Cigarette smoking',
          'NCIT:C95802 ': 'Ischemic Cerebrovascular Accident',
          'NCIT:C95803 ': 'Hemorrhagic Cerebrovascular Accident',
          'NCIT:C3390': 'Cerebrovascular Accident',
          'NCIT:C25150': 'Age',
          'NCIT:C63663': 'Fasting',
          'NCIT:C16632': 'Geographic Area',
          'HP:0001717': 'Coronary artery calcification',
          'HP:0012273': 'Increased carotid artery intimal medial thickness',
          'HP:0001658': 'Myocardial infarction',
          'HP:0000822': 'Hypertension',
          'HP:0040217': 'Elevated hemoglobin A1c',
          'HP:0005110': 'Atrial fibrillation',
          'HP:0031547': 'Abnormal QT interval',
          'HP:0031593': 'Abnormal PR interval',
          'HP:0003115': 'Abnormal EKG',
          'HP:0001712': 'Left ventricular hypertrophy',
          'HP:0002099': 'asthma',
          'HP:0012824': 'Severity',
          'HP:0006510': 'Chronic Obstructive Pulmonary Disease',
          'HP:0010535': 'Sleep Apnea',
          'HP:0002140': 'Ischemic stroke',
          'HP:0001342': 'Cerebral hemorrhage',
          'EFO:0007117': 'carotid artery intima media thickness',
          'OBA:1001089': 'sex',
          'OBA:1001088': 'race',
          'OBA:VT0001253': 'body height',
          'OBA:VT0001259': 'body mass',
          'OBA:1001084': 'waist circumference',
          'OBA:1000032': 'hip circumference',
          'OBA:VT0000188': 'blood glucose amount',
          'OBA:VT0001560': 'blood insulin amount',
          'OBA:1001085': 'QRS duration',
          'OBA:1001087': 'heart rate',
          'OBA:VT0001588': 'blood hemoglobin amount',
          'OBA:VT0003179': 'platelet quantity',
          'OBA:VT0001586': 'erythrocyte quantity',
          'OBA:VT0000217': 'leukocyte quantity',
          'OBA:0000061': 'circulating fibrinogen levels',
          'OBA:VT0008595': 'blood interleukin-6 amount',
          'OBA:VT0005328': 'blood creatinine amount',
          'OBA:0003747': 'glomerular filtration rate',
          'OBA:VT0000181': 'blood LDL cholesterol amount',
          'OBA:VT0000184': 'blood HDL cholesterol amount',
          'OBA:VT0002644': 'blood triglyceride amount',
          'OBA:VT0000180': 'blood cholesterol amount',
          'MONDO:0005068': 'myocardial infarction (disease)',
          'MONDO:0005252': 'Heart Failure',
          'MONDO:0005044 ': 'hypertensive disorder',
          'MONDO:0005015': 'diabetes mellitus (disease)',
          'MONDO:0005399': 'venous thromboembolism',
          'MONDO:0004979': 'asthma',
          'MONDO:0005002': 'Chronic Obstructive Pulmonary Disease',
          'MONDO:0007147': 'obstructive sleep apnea syndrome',
        },
        dataPacketCurie: '',
        dataPacketTerm: '',
        perPage: 10,
        currentPage: 1,
        items: [],
        fields: [
          {
            key: 'study',
            label: 'Study',
            class: 'fieldHeaders',
          },
          {
            key: 'dataset',
            label: 'Dataset',
            class: 'fieldHeaders'
          },
          {
            key: 'matching_tag',
            label: 'Matching Term',
            class: 'fieldHeaders',
          },
          {
            key: 'other_tags',
            label: 'Other Annotations',
            class: 'fieldHeaders',
          }
        ],
      };
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    mounted() {
      this.gatherData();
    },
    watch: {
      term() {
        this.gatherData();
      },
    },
    methods: {
      formatOtherAnnotations(annoList) {
        const returnList = [];
        annoList.forEach((elem) => {
          returnList.push({
            id: elem,
            label: this.termMap[elem],
          });
        });
        return returnList;
      },
      gatherData() {
        this.dataPacketCurie = "";
        this.fetchAssettsCurie(this.term.curie);
      },
      async fetchAssettsCurie(curie) {
        try {
          const searchResponse = await BL.getAssettsCurie(curie);
          this.parseItems(searchResponse);
          this.dataPacketCurie = searchResponse;
          // this.fetchAssettsTerm(this.term.match)
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      async fetchAssettsTerm(term) {
        try {
          const searchResponse = await BL.getAssettsTerm(term);
          this.dataPacketTerm = searchResponse;
        }
        catch (e) {
          console.log('nodeResponse ERROR', e, this);
        }
      },
      parseItems(dataPacket) {
        this.items = [];
        dataPacket.response.docs.forEach((elem) => {
          this.items.push(
            {
              study: elem.study_accession,
              url: elem.study_url,
              dataset: elem.study_dataset_accession,
              dataset_url: elem.study_dataset_url,
              matching_tag: {
                id: elem.ontology_class,
                label: this.termMap[elem.ontology_class],
              },
              other_tags: this.formatOtherAnnotations(elem.other_annotations),

            }
          )
        });
      },
    },
  };
</script>
<style>
  .fieldHeaders { font-weight: bold; }
</style>
