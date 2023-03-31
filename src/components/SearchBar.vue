<script setup>
import axios from 'axios'

defineEmits(['previewCity'])

const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_MAP_URL}/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${import.meta.env.VITE_MAP_ID}&types=place`,
        )
        mapboxSearchResults.value = result.data.features
      }
      catch {
        searchError.value = true
      }

      return
    }
    mapboxSearchResults.value = null
  }, 300)
}
</script>

<template>
  <div class="pt-4 mb-8 relative mx-12 md:mx-0 lg:mx-0">
    <input
      v-model="searchQuery" type="text" placeholder="Search for a city or state" class="py-2 w-full bg-transparent border-b focus:outline-none"
      @input="getSearchResults"
    >

    <ul v-if="mapboxSearchResults" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 top-[66px]">
      <p v-if="searchError" class="py-2">
        Sorry, something went wrong, please try again.
      </p>
      <p v-if="!searchError && mapboxSearchResults.length === 0" class="py-2">
        No results match your query, try a different term.
      </p>
      <template v-else>
        <li
          v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
          class="py-2 cursor-pointer hover:bg-slate-700 px-2" @click="$emit('previewCity', searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </template>
    </ul>
  </div>
</template>
