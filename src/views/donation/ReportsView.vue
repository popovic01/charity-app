<template>
  <CoverImage :title="'Donations'"></CoverImage>

  <div class="pt-3 text-center" v-if="currentUser.isAdmin">
    <h3>Total donations: {{ totalDonations }}e</h3>
  </div>

  <div class="d-flex justify-content-center mt-2" v-if="!currentUser.isAdmin">
    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
  </div>

  <div class="p-4">
    <DataTable
      :value="donationsDataForUser"
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
import Chart from 'primevue/chart'
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

const filterDonations = () => {
  let data = []
  if (currentUser.value.isAdmin) {
    data = donationsDataAll.value
  } else {
    donationsDataAll.value.forEach((x) => {
      if (x.user == currentUser.value.email) data.push(x)
    })
  }
  return data
}

const retrieveTotalDonations = () => {
  let total = 0
  donationsDataAll.value.forEach((x) => {
    total += x.amount
  })
  return total
}

const retrieveTotalDonationsForUser = () => {
  let total = 0
  donationsDataForUser.value.forEach((x) => {
    total += x.amount
  })
  return total
}

const retrieveCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'))
}

const setChartData = () => {
  return {
    labels: ['Your donations', 'Total donations'],
    datasets: [
      {
        data: [totalDonationsForUser, totalDonations],
        backgroundColor: ['#f28482', '#84a59d'],
        hoverBackgroundColor: ['#EA3D3A', '#516D66']
      }
    ]
  }
}

const currentUser = ref(retrieveCurrentUser())
const donationsDataAll = ref(retrieveDonations())
const donationsDataForUser = ref(filterDonations())
const totalDonations = ref(retrieveTotalDonations())
const totalDonationsForUser = ref(retrieveTotalDonationsForUser())

const chartData = ref(setChartData())

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
