import { get, post } from '../utils/request'

const onLogin = async (params: any) => {
  return post('/api/login', params, { loading: true, text: '正在登录，请稍后！' })
}
const getUser = async() => {
  return get('/api/getUser', null, { loading: true, text: '正在获取用户信息！' })
}

export {
  getUser,
  onLogin,
}