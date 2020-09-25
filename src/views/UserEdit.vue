<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          v-model="user.name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          :src="user.image"
          class="d-block"
          width="300"
          height="300"
          v-if="user.image"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
      },
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.setUser(userId);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    setUser(userId) {
      const { id, image, name } = this.currentUser;
      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "not-found" });
        return;
      }
      this.user.id = id;
      this.user.name = name;
      this.user.image = image;
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.image = "";
      } else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.user.image = imageUrl;
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target;
        const formData = new FormData(form);
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData,
        });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.$router.push({ name: "user", params: { id: this.user.id } });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新個人資料無法更新個人資料",
        });
      }
    },
  },
};
</script>