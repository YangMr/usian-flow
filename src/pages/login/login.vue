<template>
  <view class="login">
    <button @click="getTask">获取任务列表数据</button>
  </view>
</template>

<script lang="ts" setup>
import { task } from '@/api/task'
const getTask = async () => {
  const res = await task({
    page: 1,
    pageSize: 5,
    status: 1,
  })

  console.log('res=>', res.data)
}
</script>

<style lang="scss" scoped></style>
