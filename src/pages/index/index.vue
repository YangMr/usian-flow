<template>
  <view class="content">
    <button @click="send">发送</button>
  </view>
</template>

<script setup lang="ts">
import { login } from '@/api/login'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

const send = async () => {
  const res = await login({
    account: 'xbsj001',
    password: '123456',
  })

  console.log('res=>', res.data)
  store.token = res.data
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
