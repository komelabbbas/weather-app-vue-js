<template>
  <main class="container text-white">
    <SearchBar @previewCity="previewCity" />
  </main>
</template>

<script setup>
import axios from "axios";

const router = useRouter();
const route = useRoute();

function gotoViewPage(params) {
  router.push({
    name: "cityView",
    params: { state: params.state, city: params.city },
    query: {
      lat: params.lat,
      lng: params.lng,
      preview: true,
    },
  });
}

function previewCity(searchResult) {
  const [city, state] = searchResult.place_name.split(",");
  const params = {
    state: state.replaceAll(" ", ""),
    city: city,
    lat: searchResult.geometry.coordinates[1],
    lng: searchResult.geometry.coordinates[0],
  }
  gotoViewPage(params)
}

async function getCurrentCity(pos) {
  try {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_ID}&units=imperial&lat=${lat}&lon=${lng}`
    const response = await axios.get(url)
    const city = response.data.name
    const params = {
      state: response.data.sys.country,
      city,
      lat,
      lng,
    }

    if (confirm(`Would you like to check ${city} city weather?`) == true) {
      gotoViewPage(params)
    }


  } catch (err) {
  }
}


if (!route.query?.search) {
  navigator.geolocation.getCurrentPosition(
    pos => getCurrentCity(pos),
    err => {
      console.log('err', err);
    }
  )
}

</script>
