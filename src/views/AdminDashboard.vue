<template>
  <CoverImage :title="'Admin Dashboard'" aria-label="Cover Image for Admin Dashboard"></CoverImage>

  <div v-if="isLoading" class="text-center mt-5">
    <ProgressSpinner />
  </div>

  <div class="pt-3 text-center" v-if="!isLoading">
    <h1>Total number of users: {{ totalUsers }}</h1>
  </div>

  <div class="p-4" v-if="!isLoading">
    <DataTable
      :value="users"
      showGridlines
      stripedRows
      paginator
      :rows="10"
      :rowsPerPageOptions="[1, 5, 10, 20, 50]"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['email']"
      tabindex="0"
      aria-label="Users Data Table"
    >
      <Column field="email" header="Email" sortable>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            placeholder="Search by email"
            tabindex="0"
            aria-label="Search by email input field"
          />
        </template>
      </Column>

      <template #empty>No users found.</template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CoverImage from '../components/CoverImage.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from '@primevue/core/api'
import { getFunctions, httpsCallable } from 'firebase/functions'
import ProgressSpinner from 'primevue/progressspinner'

const isLoading = ref(true)

const retrieveUsers = async () => {
  const functions = getFunctions()
  const getAllUsers = httpsCallable(functions, 'getAllUsers')

  try {
    const result = await getAllUsers()
    const fetchedUsers = result.data.users || []

    users.value = fetchedUsers.map((user) => ({
      email: user.email
    }))
    totalUsers.value = users.value.length
    return users.value
  } catch (err) {
    console.error('Error fetching users: ', err)
    return []
  } finally {
    isLoading.value = false
  }
}

const users = ref([])
const totalUsers = ref(0)

const filters = ref({
  email: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

onMounted(async () => {
  await retrieveUsers()
})
</script>

<style scoped>
h1 {
  font-size: 22.6px;
}
</style>
