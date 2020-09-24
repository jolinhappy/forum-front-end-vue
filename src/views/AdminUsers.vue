<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>
          <td>
            <button
              type="button"
              class="btn btn-link"
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="
                toggleIsAdmin({ userId: user.id, isAdmin: user.isAdmin })
              "
            >
              {{ user.isAdmin ? "set as user" : "set as admin" }}
            </button>
          </td>
        </tr>
        <!-- <tr>
          <th scope="row">2</th>
          <td>user1@example.com</td>
          <td>user</td>
          <td>
            <button type="button" class="btn btn-link">set as admin</button>
          </td>
        </tr>-->
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await adminAPI.users.get();
        const { users } = data;
        this.users = users;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料",
        });
      }
    },
    async toggleIsAdmin({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString(),
        });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin,
            };
          }
          return user;
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法修改使用者權限",
        });
      }
    },
  },
};
</script>