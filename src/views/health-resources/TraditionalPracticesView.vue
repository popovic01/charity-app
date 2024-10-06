<template>
  <CoverImage :title="'Traditional Practices'"></CoverImage>
  <main class="container mt-5 mb-3" tabindex="0">
    <div id="content" class="p-2">
      <h1 class="mb-4">Traditional Practices of Australian Indigenous Communities</h1>
      <p>
        Indigenous Australian communities have a rich cultural heritage that spans over 60,000
        years, with traditional practices playing a central role in their connection to the land,
        the spirit, and the well-being of their people. These practices are holistic, encompassing
        physical, emotional, and spiritual health, passed down through generations to sustain their
        unique way of life.
      </p>

      <section class="mb-5" aria-labelledby="healing-and-medicine">
        <h2 id="healing-and-medicine">Healing and Medicine</h2>
        <p>
          Indigenous healing practices are deeply rooted in the natural environment. Aboriginal and
          Torres Strait Islander peoples have long relied on traditional bush medicine, using native
          plants, herbs, and natural resources to treat a range of ailments. Knowledge of these
          plants—such as tea tree oil, eucalyptus, and desert lime—has been shared by Elders and
          healers, known as "Ngangkari" in some communities, who use this knowledge to restore
          balance to both body and spirit.
        </p>
      </section>

      <section class="mb-5" aria-labelledby="connection-to-country">
        <h2 id="connection-to-country">Connection to Country</h2>
        <p>
          For Indigenous peoples, health is closely linked to their relationship with the land, or
          "Country." Traditional practices such as "Caring for Country" involve maintaining and
          preserving the natural environment, which they believe is essential for both individual
          and community well-being. This spiritual connection includes ceremonies, storytelling, and
          rituals that honor the land, ancestors, and Dreamtime stories, which are foundational to
          their culture.
        </p>
      </section>

      <section class="mb-5" aria-labelledby="ceremonies-and-spirituality">
        <h2 id="ceremonies-and-spirituality">Ceremonies and Spirituality</h2>
        <p>
          Ceremonies are a vital aspect of traditional Indigenous practices, serving as ways to
          celebrate, mourn, heal, and connect with ancestors. Practices such as "Welcome to Country"
          and "Smoking Ceremonies" are commonly performed to cleanse and protect, using smoke from
          burning native plants. These ceremonies not only offer healing but also foster a deep
          sense of community and continuity.
        </p>
      </section>

      <section class="mb-5" aria-labelledby="traditional-diets">
        <h2 id="traditional-diets">Traditional Diets</h2>
        <p>
          Traditional diets of Indigenous Australians, often referred to as "Bush Tucker," have
          sustained their communities for millennia. These diets are rich in nutrient-dense foods
          sourced from the land and sea, including native fruits, vegetables, seeds, fish, and game.
          The traditional diet is known for its benefits in preventing chronic diseases, promoting
          long-term health, and aligning with their cultural practices of sustainable living.
        </p>
      </section>

      <section class="mb-5" aria-labelledby="knowledge-and-learning">
        <h2 id="knowledge-and-learning">Knowledge and Learning</h2>
        <p>
          The transmission of knowledge is an essential aspect of Indigenous culture. Elders play a
          significant role in teaching younger generations about the health practices, spiritual
          beliefs, and traditional ways of life that have ensured the survival and resilience of
          their communities. Storytelling, art, and dance are crucial to passing on this wisdom and
          maintaining a connection to cultural identity.
        </p>
      </section>

      <section class="mb-5" aria-labelledby="modern-recognition-and-integration">
        <h2 id="modern-recognition-and-integration">Modern Recognition and Integration</h2>
        <p>
          There is growing recognition of the importance of integrating Indigenous knowledge and
          traditional practices into contemporary health frameworks. Many health professionals now
          collaborate with Indigenous healers to incorporate traditional methods alongside Western
          medicine, recognizing the value of cultural practices in promoting holistic well-being.
        </p>
      </section>
    </div>

    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="downloadPractices()"
        id="downloadBtn"
        aria-label="Download practices as PDF"
      >
        Download practices
      </button>
    </div>
  </main>
</template>

<script setup>
import CoverImage from '../../components/CoverImage.vue'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

function downloadPractices() {
  const content = document.getElementById('content')

  html2canvas(content, {
    scale: 2
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const imgWidth = 210
    const pageHeight = pdf.internal.pageSize.height
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('traditional_practices.pdf')
  })
}
</script>

<style></style>
