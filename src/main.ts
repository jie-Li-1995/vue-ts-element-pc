import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Loading } from 'element-ui'
import '@/theme/index.css'
import '@/assets/css/init.css'
import '@/assets/css/fonts.css'
import '@/assets/iconfont/iconfont.css'
import { roles, token } from '@/utils'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/en.js'
import VueAxios from 'vue-axios'

interface BaseConfig {
  [propName: string]: any;
}

const pending: BaseConfig = {}
const CancelToken = axios.CancelToken
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key](key)
  } else if (pending[key] && !isRequest) delete pending[key]
}
const getRequestIdentify = (config: any, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

const loadingOptions = {
  fullscreen: true,
  text: 'loading...'
}
let loadingService = {}
let request = 0

axios.interceptors.request.use(
  config => {
    config.headers.AuthToken = token.get() || ''
    // 拦截重复请求(即当前正在进行的相同请求)
    const requestData: string = getRequestIdentify(config, true)
    removePending(requestData, true)
    config.cancelToken = new CancelToken((c) => {
      pending[requestData] = c
    })
    if (request === 0) {
      loadingService = Loading.service(loadingOptions)
    }
    request++
    console.log(config)
    return config
  },
  err => {
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    const myToken = response.data.Token || ''
    if (myToken) token.set(myToken)
    const requestData = getRequestIdentify(response.config.url)
    removePending(requestData)
    request--
    if (request === 0) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        loadingService.close()
      }, 500)
    }
    return response
  },
  error => {
    request--
    if (request === 0) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        loadingService.close()
      }, 500)
    }
    return Promise.reject(error)
  })

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)

Vue.directive('role', {
  bind: function (el, binding, vnode) {
    if (roles.check(binding.value)) el.style.display = 'none'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
