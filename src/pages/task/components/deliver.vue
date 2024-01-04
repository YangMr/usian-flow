<template>
  <scroll-view
    class="scroll-view"
    @refresherrefresh="onScrollViewRefresh"
    refresher-enabled
    refresher-background="#fff"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrollToLower"
    scroll-y
  >
    <view class="scroll-view-wrapper">
      <view class="task-card" v-for="(item, index) in taskListArr" :key="index">
        <navigator :url="`/subpkg_task/detail/index?jobId=${item.id}`">
          <view class="header">
            <text class="no">任务编号: {{ item.transportTaskId }}</text>
            <view class="status" v-if="item.actualArrivalTime > item.planDepartureTime"
              >已延迟</view
            >
          </view>

          <view class="body">
            <view class="timeline">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }} </view>
            </view>
          </view>
        </navigator>

        <view class="footer">
          <view class="label">到货时间</view>
          <view class="time">{{ item.planArrivalTime }}</view>
          <navigator url="/subpkg_task/pickup/index" v-if="item.enablePickUp" class="action">
            提货
          </navigator>
          <navigator v-else hover-class="none" class="action disabled"> 提货 </navigator>
        </view>
      </view>
    </view>
  </scroll-view>
  <view v-if="isEmpty">空数据</view>
</template>

<script setup lang="ts">
import { taskList } from '@/api/task'
import type { TaskItemType } from '@/api/types/task-type'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 页码
const page = ref<number>(1)
// 条数
const pageSize = ref<number>(5)
// 下拉刷新的状态 false 未开启下拉刷新 true开启下拉刷新
const isTriggered = ref<boolean>(false)
// 是否还有数据 true 表示有数据， false没有数据
const hasMore = ref<boolean>(true)
// 初始化一个变量， 用来控制是否展示空数据 false 有数据 true 没有数据
const isEmpty = ref(true)

// 初始化一个变量， 保存请求到的任务列表数据
const taskListArr = ref<TaskItemType[]>([])

// 获取任务列表数据
const getTaskList = async () => {
  try {
    // 调用任务列表接口
    const res = await taskList({
      page: page.value,
      pageSize: pageSize.value,
      status: 1,
    })
    // 判断请求是否成功
    if (res.code !== 200) return uni.utils.toast('获取列表失败，稍后重试！')

    // 如果页码为第一页，则需要将数据清空
    if (page.value === 1) taskListArr.value = []

    // 合并数据
    taskListArr.value = [...taskListArr.value, ...(res.data.items || [])]

    // 页码++
    page.value++

    console.log('page.value', page.value)
    // 如果当前的页码大于等于总页码， 则需要将hasMore设置为false， 表示数据加载完成
    if (page.value > res.data.pages) hasMore.value = false

    // 如果
    if (taskListArr.value.length > 0) isEmpty.value = false
  } catch (error) {
    console.log('error', error)
  }
}

// 上拉加载
const onScrollToLower = () => {
  // 接口没有数据， 不在进行数据请求
  if (!hasMore.value) return
  getTaskList()
}

// 下拉刷新
const onScrollViewRefresh = async () => {
  // 开启下拉刷新状态
  isTriggered.value = true
  // 页码重置为1
  page.value = 1
  // 获取数据
  await getTaskList()
  // 结束下拉刷新
  isTriggered.value = false
}

onLoad(() => {
  getTaskList()
})
</script>

<style scoped lang="scss">
.scroll-view {
  height: 100%;

  .scroll-view-wrapper {
    overflow: hidden;
  }
}
.task-card {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 15rpx 30rpx 30rpx;
  padding: 24rpx 30rpx 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .no {
    font-size: $uni-font-size-base;
    color: $uni-main-color;
    font-weight: 500;
  }

  .status {
    width: 104rpx;
    height: 44rpx;
    border: 2rpx solid #ef4f3f;
    border-radius: 22rpx;
    font-weight: 400;
    font-size: 24rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ef4f3f;
  }
}

.body {
  padding: 40rpx 0;
  border-bottom: 1rpx solid #f4f4f4;
}
.timeline {
  position: relative;
  padding: 0 30rpx;
  margin-left: 30rpx;
  border-left: 2rpx dashed #f4f4f4;
}
.timeline:before,
.timeline:after {
  display: block;
  width: 44rpx;
  height: 44rpx;
  background: #2a2929;
  border-radius: 22rpx;
  color: #fff;
  text-align: center;
  line-height: 44rpx;
  font-size: 24rpx;
  position: absolute;
  left: -24rpx;
}

.timeline:before {
  content: '起';
  top: -1rpx;
}
.timeline:after {
  content: '止';
  bottom: -1rpx;
  background-color: $uni-primary;
}

.line {
  font-size: $uni-font-size-small;
  color: $uni-secondary-color;
  margin-top: 30rpx;

  &:first-child {
    margin-top: 0;
  }
}
.footer {
  padding: 20rpx 0;
  position: relative;

  &.flex {
    display: flex;
  }
}

.label,
.time {
  font-size: $uni-font-size-small;
  margin-right: 15rpx;
  color: $uni-secondary-color;
}

.action {
  position: absolute;
  right: 0;
  top: 50%;
  display: flex;
  align-items: center;
  height: 64rpx;
  padding: 0 40rpx;
  background-color: $uni-primary;
  color: #fff;
  font-size: $uni-font-size-small;
  border-radius: 64rpx;
  transform: translate(0, -50%);

  &.disabled {
    background-color: #fadcd9;
  }
}
</style>
