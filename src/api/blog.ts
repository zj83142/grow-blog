import { get, post } from '../utils/request'

// 保存文章
const onSaveBlog = async (params: any) => {
  return post('/api/blog/save', params, { loading: true, text: '数据保存中，请稍后！'})
}

// 根据类目获取文章列表
const getBlogByCategroy = async (params: any) => {
  return get('/api/blog/getByCategory', params, { loading: true, text: '正在获取数据，请稍后！'})
}

const getBlogById = async(params: any) => {
  return get('/api/blog/getById', params, { loading: true, text: '正在获取数据，请稍后！'})
}

export {
  onSaveBlog,
  getBlogByCategroy,
  getBlogById
}