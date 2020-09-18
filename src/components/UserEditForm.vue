<template>
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
      <img :src="user.image" class="d-block" width="300" height="300" />
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
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        id: "",
        name: "",
        image: "",
      }),
    },
  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        image: "",
      },
    };
  },
  created() {
    this.user = {
      ...this.user,
      ...this.initialUser,
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.image = "";
      } else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.user.image = imageUrl;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>