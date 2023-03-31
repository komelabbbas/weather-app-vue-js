<script setup>
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const data = ref(null)

getWeatherData()

async function getWeatherData() {
  try {
    const weatherData = await axios.get(
      `${import.meta.env.VITE_WEATHER_API_URL}/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${import.meta.env.VITE_WEATHER_ID}&units=metric`,
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

    data.value = weatherData.data
  }
  catch (err) {
  }
}
</script>

<template>
  <AsyncCityView v-if="data" :weather-data="data" />
</template>
