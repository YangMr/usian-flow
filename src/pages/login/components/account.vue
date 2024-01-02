<template>
  <uni-forms ref="form" :rules="accountRules" :modelValue="formData">
    <uni-forms-item name="account">
      <input type="text" v-model.trim="formData.account" placeholder="请输入账号" />
    </uni-forms-item>
    <uni-forms-item name="password">
      <input type="password" v-model.trim="formData.password" placeholder="请输入密码" />
    </uni-forms-item>
    <button @click="submitLogin" class="submit-button">登录</button>
  </uni-forms>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { formDataType } from './types/type'
import { accountRules } from './rules/rule'
import { login } from '@/api/login'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

// 获取地址栏的参数(跳转到的url以及跳转的类型)
const redirectUrl = ref('')
const routeType = ref('')
onLoad((query) => {
  redirectUrl.value = query?.redirectUrl
  routeType.value = query?.routeType
})

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
      uni.navigateTo({
        url: '/pages/my/index',
      })
    }
  } catch (e) {
    console.log('error')
  }
}

console.log('token', store.token)
</script>

<style lang="scss">
.submit-button {
  height: 100rpx;
  line-height: 100rpx;
  /* #ifdef APP */
  padding-top: 4rpx;
  /* #endif */
  margin-top: 80rpx;
  border: none;
  color: #fff;
  background-color: $uni-primary;
  border-radius: 100rpx;
  font-size: $uni-font-size-big;
}

button[disabled] {
  background-color: #fadcd9;
  color: #fff;
}
</style>
