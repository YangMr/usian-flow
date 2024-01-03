<template>
  <view class="">
    {{ messageList }}
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

import { useMessageList } from '@/hooks/useMessage'
const { page, isTriggered, hasMore, messageList, getMessageList } = useMessageList(201)

// 下拉刷新
const onScrollViewRefresh = async () => {
  // 将下拉刷新的状态重置为true
  isTriggered.value = true

  // 将页码重置为第一页
  page.value = 1

  // 重新请求数据
  await getMessageList()

  // 将下拉刷新的状态重置为false
  isTriggered.value = false
}

// 上拉加载
const onScrollToLower = () => {
  // 如果没有数据,则不进行请求数据
  console.log('hasMore', hasMore.value)
  if (!hasMore.value) return
  // 继续请求数据
  getMessageList()
}

// 初始化加载
onLoad(() => {
  getMessageList()
})
</script>

<style lang="sass"></style>
