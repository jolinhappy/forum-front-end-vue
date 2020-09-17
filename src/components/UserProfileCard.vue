<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | emptyImage " width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{user.commentsLength}}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{user.favoritedRestaurantsLength}}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{user.followingLength}}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{user.followersLength}}</strong> followers (追隨者)
            </li>
          </ul>
          <p></p>
          <form action="/following/102?_method=DELETE" method="POST" style="display: contents;">
            <a href="#" class="btn btn-primary" v-if="isCurrentUser">Edit</a>
            <template v-else>
              <button
                type="submit"
                class="btn btn-danger"
                v-if="user.isFollowed"
                @click.prevent.stop="deleteFollow"
              >取消追蹤</button>
              <button
                type="submit"
                class="btn btn-primary"
                v-else
                @click.prevent.stop="addFollow"
              >追蹤</button>
            </template>
          </form>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
    isFollowed: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
      currentUser: dummyUser.currentUser,
      isCurrentUser: "",
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
    checkCurrentUser() {
      const { id } = this.$route.params;
      if (Number(id) === this.currentUser.id) {
        this.isCurrentUser = true;
      } else {
        this.isCurrentUser = false;
      }
    },
  },
  created() {
    this.checkCurrentUser();
  },
};
</script>