<template>
  <CoverImage :title="'Nutrition'"></CoverImage>
  <div class="container mt-3">
    <h2>Nutrition Information</h2>
    <div class="form-group">
      <textarea
        v-model="userInput"
        class="form-control"
        rows="4"
        placeholder="Ask about Indigenous nutrition..."
      ></textarea>
    </div>
    <button @click="fetchNutritionInfo" class="btn btn-primary mt-2">Get Nutrition Info</button>

    <div v-if="loading" class="mt-3">Loading...</div>
    <div v-if="error" class="text-danger mt-3">{{ error }}</div>
    <div v-if="response" class="mt-3">
      <h3>Response:</h3>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CoverImage from '../../components/CoverImage.vue'

const userInput = ref('')
const response = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchNutritionInfo = async () => {
  loading.value = true
  error.value = null
  response.value = null

  try {
    const apiKey = 'AIzaSyCQsPFq-QzVKJr5amAx6xBH7BZ-_ccm3vQ'
    const apiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: userInput.value }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    response.value = apiResponse.data.candidates[0].content.parts[0].text
  } catch (err) {
    console.error(err)
    error.value = 'Error fetching nutrition information. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
