<script setup>
import axios from 'axios'

const currentLocationWeatherData = ref(null)

const router = useRouter()

function previewCity(searchResult) {
  const [city, state] = searchResult.place_name.split(',')
  const params = {
    state: state.replaceAll(' ', ''),
    city,
    lat: searchResult.geometry.coordinates[1],
    lng: searchResult.geometry.coordinates[0],
  }

  gotoViewPage(params)
}

function gotoViewPage(params) {
  router.push({
    name: 'cityView',
    params: { state: params.state, city: params.city },
    query: {
      lat: params.lat,
      lng: params.lng,
      preview: true,
    },
  })
}

async function fetchCurrentLocationWeatherData(params) {
  const weatherData = await axios.get(
    `${import.meta.env.VITE_WEATHER_API_URL}/data/2.5/onecall?lat=${params.lat}&lon=${params.lng}&appid=${import.meta.env.VITE_WEATHER_ID}&units=metric`,
  )

  // cal current date & time
  const localOffset = new Date().getTimezoneOffset() * 60000
  const utc = weatherData.data.current.dt * 1000 + localOffset
  weatherData.data.currentTime
    = utc + 1000 * weatherData.data.timezone_offset

  // cal hourly weather offset
  weatherData.data.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset
    hour.currentTime
      = utc + 1000 * weatherData.data.timezone_offset
  })

  currentLocationWeatherData.value = weatherData.data
}

async function getCurrentCity(pos) {
  try {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude

    const url = `${import.meta.env.VITE_WEATHER_API_URL}/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_ID}&units=imperial&lat=${lat}&lon=${lng}`
    const response = await axios.get(url)
    const city = response.data.name
    const state = response.data.sys.country
    const params = {
      state,
      city,
      lat,
      lng,
    }

    await fetchCurrentLocationWeatherData(params)

    router.replace({ query: params })
  }
  catch (err) {
  }
}

navigator.geolocation.getCurrentPosition(
  pos => getCurrentCity(pos),
  (err) => {
  },
)
</script>

<template>
  <main class="w-full max-w-5xl mx-auto text-white">
    <SearchBar @preview-city="previewCity" />
    <AsyncCityView v-if="currentLocationWeatherData" :weather-data="currentLocationWeatherData" />
  </main>
</template>
