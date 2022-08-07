import axios from 'axios';
import qs from 'qs'

import { ElLoading } from 'element-plus';
const LoadingInstance: any = {
  _target: null, // 保存Loading实例
  _count: 0
};
/**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options: any) {
  if(_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if(LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

function request(axiosConfig: any, customOptions: any) {
  const service = axios.create({
    // baseURL: 'http://localhost:8888', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });
  // 自定义配置
  let custom_options = Object.assign({
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    loading: false, // 是否开启loading层效果, 默认为false
  }, customOptions)

  service.interceptors.request.use(
    (config: any) => {
      // config.headers.authorizaiton = localStorage.getItem('token')
      config.headers.common['Authorization'] = localStorage.getItem('token');
      // 创建loading实例  
      if (custom_options.loading) {
        LoadingInstance._count++;
        if(LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service({
            text: custom_options.text
          });
        }
      }
      return config;
    }, 
    error => {
      return Promise.reject(error);
    }
  );
  service.interceptors.response.use(
    response => {
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      const { status, data } = response
      if (status === 200) {
        return data
      }
      return Promise.reject('请求错误！');
    },
    error => {
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      return Promise.reject(error);
    }
  );

  // service(axiosConfig) 返回的是一个Promise对象
  return service(axiosConfig)
}

function get(url: string, params: any = {}, conf: any) {
  return request({ url: `${url}?${qs.stringify(params)}`, method: 'get'}, conf)
}
function post(url: string, params: any = {}, conf: any) {
  return request({ url, method: 'post', data: params}, conf)
}
export {
  get,
  post
};
