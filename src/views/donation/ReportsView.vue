<template>
  <CoverImage :title="'Donations'"></CoverImage>

  <div class="p-4">
    <DataTable
      :value="donationsData"
      showGridlines
      stripedRows
      paginator
      :rows="5"
      :rowsPerPageOptions="[1, 5, 10, 20, 50]"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['user', 'amount', 'date']"
    >
      <Column field="user" header="User" sortable>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" placeholder="Search by user" />
        </template>
      </Column>

      <Column field="amount" header="Amount" sortable>
        ><template #filter="{ filterModel }">
          <InputNumber
            v-model="filterModel.value"
            mode="currency"
            currency="eur"
            placeholder="Search by amount"
          />
        </template>
      </Column>

      <Column field="date" header="Date" dataType="date" sortable>
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
          <DatePicker
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="Search by date"
          />
        </template>
      </Column>

      <template #empty>No donations found.</template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CoverImage from '../../components/CoverImage.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import { FilterMatchMode } from '@primevue/core/api'

const convertDates = (donations) => {
  return donations.map((donation) => ({
    ...donation,
    date: donation.date ? new Date(donation.date) : null
  }))
}

const retrieveDonations = () => {
  let donations = localStorage.getItem('donations')
  return donations ? convertDates(JSON.parse(donations)) : []
}

const donationsData = ref(retrieveDonations())
const filters = ref({
  user: { value: null, matchMode: FilterMatchMode.CONTAINS },
  amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  date: { value: null, matchMode: FilterMatchMode.DATE_IS }
})

const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
