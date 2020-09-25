<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr />
      <TopRestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </template>
  </div>
</template>

<script>
import TopRestaurantCard from "./../components/TopRestaurantCard";
import restaurantsApi from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import NavTabs from "./../components/NavTabs";
import Spinner from "./../components/Spinner";

export default {
  components: {
    NavTabs,
    TopRestaurantCard,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchTopRestaurants();
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        this.isLoading = true;
        const { data } = await restaurantsApi.getRestaurantsTop();
        const { restaurants } = data;
        console.log(restaurants);
        this.restaurants = restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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