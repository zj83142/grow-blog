import { rejects } from 'assert'
import { getUser, onLogin } from '../../api/user'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  userInfo: null,
})

// getters
const getters = {
  userInfo(state: any) {
    return {username: state.user?.userName}
  },
  isLogin(state: any) {
    return !!state.user
  }
}

// actions
const actions = {
  async onLogin(context: any, payload: any) {
    const res: any = await onLogin(payload)
    const { status, data, token } = res
    if (status) {
      context.commit('setUserInfo', data)
      localStorage.setItem('token', token)
    }
    return data;
  },
  async getUser(context: any) {
    const res = await getUser()
    const { status, data } = res
    if (status) {
      context.commit('setUserInfo', data)
    }
    return data;
  }
}

// mutations
const mutations = {
  setUserInfo(state: any, data: any) {
    state.userInfo = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}