
<template>
  <div class="col-3">
    <router-link :to="{ name: 'user' , params: { id: user.id }}">
      <img :src="user.image | emptyImage" width="140px" height="140px" />
    </router-link>
    <h2>{{user.name}}</h2>
    <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
    <p class="mt-3">
      <button
        type="button"
        class="btn btn-danger"
        v-if="user.isFollowed"
        @click.prevent.stop="deleteFollow"
      >取消追蹤</button>
      <button type="button" class="btn btn-primary" v-else @click.prevent.stop="addFollow">追蹤</button>
    </p>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  methods: {
    addFollow() {
      this.user = {
        ...this.user,
        isFollowed: true,
      };
    },
    deleteFollow() {
      this.user = {
        ...this.user,
        isFollowed: false,
      };
    },
  },
};
</script>