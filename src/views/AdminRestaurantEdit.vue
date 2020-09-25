<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <AdminRestaurantForm
        @after-submit="handleAfterSubmit"
        :initial-restaurant="restaurant"
        :isProcessing="isProcessing"
      />
    </template>
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    AdminRestaurantForm,
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false,
      isLoading: true,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });
        if (data.status !== "success") {
          return;
        }
        this.$router.push({ name: "admin-restaurants" });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新表單",
        });
      }
    },
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId,
        } = data.restaurant;

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId,
        };
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得資料",
        });
      }
    },
  },
};
</script>