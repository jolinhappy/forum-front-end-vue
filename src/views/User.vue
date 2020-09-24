
<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <UserProfileCard
        :user="user"
        :is-current-user="currentUser.id === user.id"
        :initial-is-followed="isFollowed"
      />

      <div class="row">
        <div class="col-md-4">
          <UserFollowingsCard :followings="Followings" />
          <br />
          <UserFollowersCard :followers="Followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :comments="Comments" />
          <br />
          <UserFavoritedRestaurantsCard
            :favoritedRestaurants="FavoritedRestaurants"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import UserProfileCard from "./../components/UserProfileCard";
import UserFollowingsCard from "./../components/UserFollowingsCard";
import UserFollowersCard from "./../components/UserFollowersCard";
import UserCommentsCard from "./../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from "./../components/UserFavoritedRestaurantsCard";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
        email: "",
        followingLength: 0,
        followersLength: 0,
        commentsLenghth: 0,
        favoritedRestaurantsLength: 0,
      },
      Followings: [],
      Followers: [],
      Comments: [],
      FavoritedRestaurants: [],
      isFollowed: false,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserData(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUserData(id);
    next();
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const { data } = await usersAPI.get({ userId });
        const { profile, isFollowed } = data;
        const {
          id,
          image,
          email,
          Comments,
          FavoritedRestaurants,
          Followers,
          Followings,
        } = profile;
        this.user = {
          id,
          image,
          name,
          email,
          followingLength: Followings.length,
          followersLength: Followers.length,
          commentsLenghth: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length,
        };
        this.Followings = Followings;
        this.Followers = Followers;
        this.Comments = Comments;
        this.FavoritedRestaurants = FavoritedRestaurants;
        this.isFollowed = isFollowed;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料",
        });
      }
    },
    // fetchCurrentUser() {
    //   this.currentUser = {
    //     ...this.currentUser,
    //     ...dummyUser.currentUser,
    //   };
    //   this.isAuthenticated = dummyUser.isAuthenticated;
    // },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>