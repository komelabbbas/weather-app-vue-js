<template>
  <div class="flex flex-col flex-1 items-center">

    <!-- Banner -->
    <div v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center text-lg flex flex-row items-center max-w-screen-md mt-6 px-8">

      <button class="mr-4" @click="back">
        <i class="fa-solid fa-arrow-left pr-2"></i>
        Back
      </button>
      <div class="flex-1">
        <p class="text-center">
          You are currently previewing <span class="lowercase">{{ data.city }}</span> city
        </p>
      </div>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ data.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(weatherData.current.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img class="w-[150px] h-auto" :src="`${imageUrl}/${weatherData.current.weather[0].icon}@2x.png`" alt="" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img class="w-auto h-[50px] object-cover" :src="`${imageUrl}/${hourData.weather[0].icon}@2x.png`" alt="" />
            <p class="text-xl">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img class="w-[50px] h-[50px] object-cover" :src="`${imageUrl}/${day.weather[0].icon}@2x.png`" alt="" />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
defineProps({
  weatherData: {
    type: Object,
    default: () => { },
  },
});

const route = useRoute();
const router = useRouter();

const imageUrl = computed(() => `${import.meta.env.VITE_WEATHER_BASE_URL}/img/wn`);

const data = computed(() => {
  return {
    city: route.params?.city ?? route.query?.city
  }
})

function back() {
  router.push({ name: 'home' })
}

</script>
