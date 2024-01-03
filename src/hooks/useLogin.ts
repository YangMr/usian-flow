import { login } from '@/api/login'
import type { formDataType } from '@/pages/login/components/types/type'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

export const useLogin = () => {
  const store = useUserStore()

  // 获取地址栏的参数(跳转到的url以及跳转的类型)
  const redirectUrl = ref('')
  const routeType = ref('')

  // 表单标识
  const form = ref()

  // 表单数据
  const formData = ref<formDataType>({
    account: 'xbsj001',
    password: '123456',
  })

  // 账号登录方法
  const submitLogin = async () => {
    try {
      // 触发表单校验
      await form.value.validate()

      // 调用登录接口
      const res = await login(formData.value)

      // 如果登录失败, 进行信息提示
      if (res.code !== 200) return uni.utils.toast('登录失败，请重试！')

      // 登录成功,将token存储到pinia
      store.token = res.data

      // 登录成功之后,跳转到首页
      // uni.navigateTo({
      //   url: "/pages/index/index",
      // });
      if (routeType.value === 'navigateTo') {
        uni.navigateTo({
          url: redirectUrl.value,
        })
      } else if (routeType.value === 'switchTab') {
        uni.switchTab({
          url: redirectUrl.value,
        })
      } else {
        uni.switchTab({
          url: '/pages/my/index',
        })
      }
    } catch (e) {
      console.log('error')
    }
  }

  return {
    form,
    formData,
    redirectUrl,
    routeType,
    submitLogin,
  }
}
