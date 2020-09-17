<template>
  <div class="card mb-3" style="max-width: 540px;margin: auto;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <router-link :to="{ name: 'restaurant' , params: { id: restaurant.id }}">
          <img class="card-img" :src="restaurant.image | emptyImage" />
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{restaurant.name}}</h5>
          <span class="badge badge-secondary">收藏數：{{restaurant.FavoritedUsers.length}}</span>
          <p class="card-text">{{restaurant.discription}}</p>
          <router-link
            :to="{ name: 'restaurant-dashboard' , params: { id: restaurant.id }}"
            class="btn btn-primary mr-2"
          >Show</router-link>
          <button
            type="button"
            class="btn btn-danger mr-2"
            @click.prevent.stop="deleteFavorite"
            v-if="restaurant.isFavorited"
          >移除最愛</button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent.stop="addFavorite"
            v-else
          >加到最愛</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true,
      };
    },
    deleteFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false,
      };
    },
  },
};
</script>