<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />
    <TopRestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import TopRestaurantCard from "./../components/TopRestaurantCard";
import restaurantsApi from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import NavTabs from "./../components/NavTabs";
export default {
  components: {
    NavTabs,
    TopRestaurantCard,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchTopRestaurants();
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        const { data } = await restaurantsApi.getRestaurantsTop();
        const { restaurants } = data;
        console.log(restaurants);
        this.restaurants = restaurants;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法接收人氣餐廳，請稍後再試",
        });
      }
    },
  },
};
</script>