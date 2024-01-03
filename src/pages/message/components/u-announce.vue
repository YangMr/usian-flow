<template>
  <view class="">公告</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Item } from '@/api/types/message-type'
import { messgeList } from '@/api/message'
import { onLoad } from '@dcloudio/uni-app'

// 页码
const page = ref(1)
// 条数
const pageSize = ref(10)
// 消息类型 200 公告 201 通知
const contentType = ref(200)
// 是否是空列表 false 空列表 true 不为空列表
const isEmpty = ref(false)
// 下拉刷新状态 false未开启下拉刷新 true开启下拉刷新
const isTriggered = ref(false)
// 是否还有数据的状态 true 有数据 false 没有数据
const hasMore = ref(false)
// 保存的是请求到消息列表
const messageList = ref<Item[]>()
const getMessageList = async () => {
  try {
    const res = await messgeList({
      page: page.value,
      pageSize: pageSize.value,
      contentType: contentType.value,
    })

    // 判断code 是否等于 200 , 不等于200 , 提示请求失败
    if (res.code !== 200) return uni.utils.toast('获取公告失败，稍后重试!')

    // 当前的页码如果是第一页
    if (page.value === 1) messageList.value = []
    messageList.value = [...(messageList.value as Item[]), ...res.data.items]

    // 页码++
    page.value++

    // 如果当前的页码等于总页码, 说明数据没有了
    if (page.value >= res.data.pages) hasMore.value = false

    // 设置是否是空列表. 如果messageList.value.length大于0, 则表示有数据
    isEmpty.value = messageList.value.length > 0

    console.log('res=>', res)
  } catch (error) {
    console.log('error', error)
  }
}

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
  if (!hasMore.value) return

  // 继续请求数据
  getMessageList()
}

// 初始化加载
onLoad(() => {
  getMessageList()
})
</script>

<style lang="scss"></style>
