import { useUserStore } from '@/stores/user'
import type { dataType } from './types/responseType'
// const baseURL = 'https://slwl-api.itheima.net'

// 定义 tabBar 的路径
const tabBarPagePaths = ['pages/task/index', 'pages/message/index', 'pages/my/index']

const baseURL = '/api'

// 请求拦截器
const httpInterceptor = {
  invoke(config: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!config.url.startsWith('http')) {
      config.url = baseURL + config.url
    }

    // 2. 请求超时
    config.timeout = 10000

    // 3. 合并单个请求的header参数
    config.header = {
      a: 1,
      ...config.header,
    }

    // 4. 通过请求头发送token
    const store = useUserStore()
    if (store.token) {
      config.header.Authorization = store.token
    }

    return config
  },
}

// 添加拦截器 http 文件上传添加拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export function http<T>(options: UniApp.RequestOptions) {
  return new Promise<dataType<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (response) => {
        console.log('pages', getCurrentPages())

        if (response.statusCode >= 200 && response.statusCode <= 300) {
          resolve(response.data as dataType<T>)
        } else if (response.statusCode === 401) {
          // token过期, 清空token, 重新跳转到登录页
          const store = useUserStore()
          store.token = ''

          // 获取页面栈
          const pageStack = getCurrentPages()

          // 当前token过期的⻚⾯地址
          const redirectURL = pageStack[pageStack.length - 1].route

          // 判断当前页面是否是tabbar路由，如果是，跳转方式为switchTab ， 否则是navigateTo
          const routeType = tabBarPagePaths.includes(redirectURL as string)
            ? 'switchTab'
            : 'navigateTo'

          // 跳转到登录也
          uni.navigateTo({
            url: `/pages/login/login?redirectURL=/${redirectURL}&routeType=${routeType}`,
          })

          // 将错误返回出去
          reject(response)
        } else {
          uni.showToast({
            icon: 'none',
            title: (response.data as dataType<T>).msg || '请求错误',
          })
          reject(response)
        }

        console.log('response=>', response)
      },
      fail: (error) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(error)
      },
    })
  })
}
