import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'

const baseURL = 'http://localhost:4000'

let requestCount = 0

const config = {
  baseURL: baseURL || '',
  timeout: 10 * 1000,
  crossDomain: true,
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 500
  }
}

const http = axios.create(config)

// 展示loading
function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin tip='加载中...' />, dom)
  }
  requestCount++
}

// 隐藏loading
function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

// 请求拦截
http.interceptors.request.use(originConfig => {
  const reqConfig = { ...originConfig }
  if (reqConfig.headers.isLoading !== false) {
    showLoading()
  }

  if (!reqConfig.url) {
    throw new Error('request need url')
  }

  if (!reqConfig.method) {
    reqConfig.method = 'get'
  }

  reqConfig.method = reqConfig.method.toLowerCase()

  return reqConfig
}, error => {
  if (error.config.headers.isLoading !== false) {
    hideLoading()
  }
  Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(response => {
  if (response.config.headers.isLoading !== false) {
    hideLoading()
  }
  const res = response.data

  if (res.code !== 200) {
    return Promise.reject(res.message || 'error')
  }
  return res
}, error => {
  if (error.config.headers.isLoading !== false) {
    hideLoading()
  }
  return Promise.reject(error)
})

export default http