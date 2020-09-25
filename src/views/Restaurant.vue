// ./src/views/Restaurant.vue
<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1>餐廳描述頁</h1>
      <!-- 餐廳資訊頁 RestaurantDetail -->
      <RestaurantDetail :initial-restaurant="restaurant" />
      <hr />
      <!-- 餐廳評論 RestaurantComments -->
      <RestaurantComments
        :restaurant-comments="restaurantComments"
        @after-delete-comment="afterDeleteComment"
      />
      <!-- 新增評論 CreateComment -->
      <CreateComment
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from "./../components/RestaurantDetail";
import RestaurantComments from "./../components/RestaurantComment";
import CreateComment from "./../components/CreateComment";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
      isLoading: true,
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true;
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          image,
          tel,
          address,
          description,
          Category,
          opening_hours,
          Comments,
        } = restaurant;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours: opening_hours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資訊",
        });
      }
    },
    afterDeleteComment(commentId) {
      // 以 filter 保留未被選擇的 comment.id
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        text,
        createdAt: new Date(),
      });
    },
  },
};
</script>