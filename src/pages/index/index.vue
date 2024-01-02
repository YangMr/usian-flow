<template>
  <view class="content">
    <button @click="send">发送</button>
  </view>
</template>

<script setup lang="ts">
import { task } from '@/api/task'

const send = async () => {
  const res = await task({
    page: 1,
    pageSize: 5,
    status: 1,
  })

  console.log('res=>', res.data)
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
