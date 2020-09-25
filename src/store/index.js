import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      //取得token存在state存在state
      state.token = localStorage.getItem('token')
    },
    //登出把現有玩家清空，改成沒有驗證，清空token
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      //登出清空state儲存的token
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data, status } = await usersAPI.getCurrentUser()
        if (status !== 200) {
          throw new Error(data.message)
        }
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true  // add this line
      } catch (error) {
        console.error('can not fetch user information')
        //驗證有問題的話登出
        commit('revokeAuthentication')
        return false  // add this line
      }
    }
  },
  modules: {
  }
})
