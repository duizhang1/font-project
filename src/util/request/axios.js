
/**
 * 配置请求
 */
// 导入模块
import axios from 'axios'
import qs from 'qs'
import store from '@src/redux/Store'
import { loginShowAction } from '@src/redux/action/Login'

// URL地址
import { BASE_URL } from './config/config.js'

// 超时时间（ms）
axios.defaults.timeout = 5000 * 1000

// 默认 axios 请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// // 如果token存在，将token设置到请求头中，不存在就不设置
if (localStorage.getItem('token') !== null) {
  axios.defaults.headers.Authorization = localStorage.getItem('token')
}
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 配置请求的参数处理、以及请求拦截
 */
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('token') !== null) {
    config.headers.Authorization = localStorage.getItem('token')
  }

  // 转换JSON
  config.paramsSerializer = function (params) {
    return qs.stringify(params, { indices: false })
  }

  return config
}, function (error) {
  // 请求错误做的一些操作
  return Promise.reject(error)
})

/**
 * 配置请求的响应处理
 */
axios.interceptors.response.use(
  response => {
    if (response.status !== '200') {
      // 后端返回200，即请求成功
      if (response.data.code === '200') {
        return Promise.resolve(response.data)
      } else if (response.data.code === '401') { // 未登陆，跳出登陆框
        store.dispatch(loginShowAction())
        return Promise.reject(response.data)
      } else {
        return Promise.reject(response.data)
      }
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + url + '?' + qs.stringify(params)).then(res => {
      resolve(res)
    })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL + url, params).then(res => {
      resolve(res)
    })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(BASE_URL + url, params).then(res => {
      resolve(res)
    })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function _delete (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(BASE_URL + url + '?' + qs.stringify(params)).then(res => {
      resolve(res)
    })
      .catch(error => {
        reject(error)
      })
  })
}

// 导出配置好的对象
export const axiosReq = {
  get,
  post,
  put,
  _delete
}
