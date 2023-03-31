import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.params.state)
  document.title = `${
    to.params.state
      ? `${to.params.city}, ${to.params.state}`
      : to.meta.title
  } | Weather App`;
  else {
    document.title = `Weather App`;
  }
  next();
});

export default router;
