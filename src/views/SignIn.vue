<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 email 和 password",
          });
          return;
        }
        //關閉按鈕功能防止多次點按造成對伺服器方送多次請求的狀況
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });
        console.log("res", response);
        // 取得 API 請求後的資料，把宣告為data的data從response取出
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        this.$store.commit("setCurrentUser", data.user);
        // 成功登入後轉址到餐聽首頁
        this.$router.push("/restaurants");
      } catch (error) {
        this.password = "";
        // 顯示錯誤提示
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
        //恢復按鈕可按狀態，讓使用者可以繼續填入正確帳密
        this.isProcessing = false;
        console.log("error", error);
      }
    },
  },
};
</script>