<template>
  <main class="container text-white">
    <SearchBar @previewCity="previewCity" />
  </main>
</template>

<script setup>
const router = useRouter();

function previewCity(searchResult) {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
}
</script>
