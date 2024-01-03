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
import { onLoad } from '@dcloudio/uni-app'
import { accountRules } from './rules/rule'
import { useLogin } from '@/hooks/useLogin'
const { form, formData, redirectUrl, routeType, submitLogin } = useLogin()

onLoad((query) => {
  redirectUrl.value = query?.redirectUrl
  routeType.value = query?.routeType
})
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
