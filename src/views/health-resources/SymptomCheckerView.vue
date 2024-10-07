<template>
  <CoverImage :title="'Symptom Checker'"></CoverImage>
  <div class="container m-2">
    <h1 class="mb-4">Symptom Checker</h1>
    <DataTable
      :value="healthIssues"
      showGridlines
      stripedRows
      paginator
      :rows="5"
      :rowsPerPageOptions="[1, 5, 10, 20, 50]"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['healthIssue', 'symptoms']"
      :filterFunction="customFilter"
      tabindex="0"
      aria-label="Symptoms checker Data Table"
      tableStyle="min-width: 50rem"
    >
      <Column field="healthIssue" header="Health Issue" sortable>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            placeholder="Search by health issue"
            tabindex="0"
            aria-label="Search by health issue field"
          />
        </template>
      </Column>
      <Column header="Related Symptoms" field="symptoms" sortable>
        <template #body="slotProps">
          {{ slotProps.data.symptoms.join(', ') }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            placeholder="Search by symptom"
            tabindex="0"
            aria-label="Search by symptom"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CoverImage from '../../components/CoverImage.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import InputText from 'primevue/inputtext'

const filters = ref({
  healthIssue: { value: null, matchMode: FilterMatchMode.CONTAINS },
  symptoms: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const healthIssues = ref([
  {
    healthIssue: 'Flu',
    symptoms: ['Fever', 'Cough', 'Sore throat', 'Body aches', 'Fatigue']
  },
  {
    healthIssue: 'Common Cold',
    symptoms: ['Runny or stuffy nose', 'Sneezing', 'Cough', 'Sore throat', 'Mild headache']
  },
  {
    healthIssue: 'Allergies',
    symptoms: ['Sneezing', 'Itchy eyes', 'Runny nose', 'Skin rash', 'Fatigue']
  },
  {
    healthIssue: 'Anxiety',
    symptoms: ['Nervousness', 'Restlessness', 'Rapid heartbeat', 'Sweating', 'Fatigue']
  },
  {
    healthIssue: 'Depression',
    symptoms: [
      'Persistent sadness',
      'Loss of interest',
      'Fatigue',
      'Sleep disturbances',
      'Difficulty concentrating'
    ]
  },
  {
    healthIssue: 'Diabetes',
    symptoms: [
      'Increased thirst',
      'Frequent urination',
      'Extreme hunger',
      'Fatigue',
      'Blurred vision'
    ]
  },
  {
    healthIssue: 'Hypertension',
    symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Flushing', 'Dizziness']
  },
  {
    healthIssue: 'Asthma',
    symptoms: [
      'Wheezing',
      'Coughing',
      'Shortness of breath',
      'Chest tightness',
      'Difficulty sleeping'
    ]
  },
  {
    healthIssue: 'Gastroenteritis',
    symptoms: ['Diarrhea', 'Vomiting', 'Stomach cramps', 'Nausea', 'Fever']
  }
])

const customFilter = (value, filter) => {
  if (!filter) {
    return true
  }
  return value.some((symptom) => symptom.toLowerCase().includes(filter.toLowerCase()))
}
</script>

<style></style>
