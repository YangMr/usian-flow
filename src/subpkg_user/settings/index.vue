<template>
  <view class="page-container">
    <button @click="submitLogout" class="submit-button">退出登录</button>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const submitLogout = () => {
  // 1. 清空token
  store.token = ''
  // 2. 跳转到登录页
  uni.navigateTo({ url: '/pages/login/login' })
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20rpx;
}
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
