import { useUserStore } from '@/stores/user'
const baseURL = 'https://slwl-api.itheima.net'

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
      console.log('aaaa')
      config.header.Authorization = store.token
    }

    return config
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

type dataType<T> = {
  code: number
  msg: string
  data: T
}

export function http<T>(options: UniApp.RequestOptions) {
  return new Promise<dataType<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode <= 300) {
          resolve(response.data as dataType<T>)
        } else if (response.statusCode === 401) {
          // token过期, 清空token, 重新跳转到登录页
          const store = useUserStore()
          store.token = ''

          // 跳转到登录也
          uni.navigateTo({ url: '/pages/login/login' })

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
