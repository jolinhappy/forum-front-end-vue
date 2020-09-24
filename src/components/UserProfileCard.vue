<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | emptyImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsLength }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ user.followingLength }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ user.followersLength }}</strong> followers (追隨者)
            </li>
          </ul>
          <p></p>
          <form
            action="/following/102?_method=DELETE"
            method="POST"
            style="display: contents"
          >
            <router-link
              :to="{ name: 'user-edit', params: { id: user.id } }"
              class="btn btn-primary"
              v-if="isCurrentUser"
              >Edit</router-link
            >
            <template v-else>
              <button
                type="submit"
                class="btn btn-danger"
                v-if="isFollowed"
                @click.prevent.stop="deleteFollow(user.id)"
              >
                取消追蹤
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                v-else
                @click.prevent.stop="addFollow(user.id)"
              >
                追蹤
              </button>
            </template>
          </form>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  props: {
    user: {
      type: Object,
      require: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed,
    };
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    },
  },
  methods: {
    async addFollow(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isFollowed = true;
        console.log("add", this.initialFollowed);
        console.log(this.isFollowed);
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤",
        });
      }
    },
    async deleteFollow(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });
        console.log("delete", this.initialFollowed);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isFollowed = false;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤",
        });
      }
    },
  },
};
</script>