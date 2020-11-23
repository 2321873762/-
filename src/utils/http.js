import axios from 'axios'
// import store from '../store/index'
import { Message, Loading } from 'element-ui'
import router from '../router/index'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

// 创建loading加载
const loading = {
  loadingService: null,
  open () {
    if (this.loadingService == null) {
      this.loadingService = Loading.service({
        target: '#home',
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.5)'
      })
    }
  },
  close () {
    if (this.loadingService != null) {
      this.loadingService.close()
    }
    this.loadingService = null
  }
}

instance.interceptors.request.use((config) => {
  // 在这里面写请求之前做的事情
  // const TOKEN = store.state.token
  // if (TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
  // config.headers['token'] = TOKEN // 请求头加上token
  // }
  loading.open()
  return config
}, error => {
  loading.close()
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // if(response.errorCode===2000){
  //   store.state.token=null;
  //   router.push('/login')
  //   Message.warning({
  //     message: '未授权，请重新登录'
  //   })
  // }
  if (response.status === 200) {
    loading.close()
    return Promise.resolve(response)
  }
}, err => {
  loading.close()
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error('错误请求')
        break
      case 401:
        // store.state.token=null;
        router.push('/login')
        Message.warning({
          message: '未授权，请重新登录'
        })
        break
      case 403:
        Message.warning({
          message: '拒绝访问'
        })
        break
      case 404:
        Message.warning({
          message: '请求错误,未找到该资源'
        })
        break
      case 405:
        Message.warning({
          message: '请求方法未允许'
        })
        break
      case 408:
        Message.warning({
          message: '请求超时'
        })
        break
      case 500:
        Message.warning({
          message: '服务器端出错'
        })
        break
      case 501:
        Message.warning({
          message: '网络未实现'
        })
        break
      case 502:
        Message.warning({
          message: '网络错误'
        })
        break
      case 503:
        Message.warning({
          message: '服务不可用'
        })
        break
      case 504:
        Message.warning({
          message: '网络超时'
        })
        break
      case 505:
        Message.warning({
          message: 'http版本不支持该请求'
        })
        break
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    Message.warning({
      message: '连接到服务器失败'
    })
  }
  return Promise.reject(err.response)
})
export default instance
