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
          <navigator
            v-if="item.status === 2"
            :url="`/subpkg_task/delivery/index?id=${item.id}`"
            class="action"
          >
            交付
          </navigator>
          <navigator v-if="item.status === 4" :url="`/subpkg_task/record/index`" class="action">
            回车登记
          </navigator>
        </view>
      </view>
    </view>
  </scroll-view>
  <view v-if="isEmpty">空数据</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';

import { useTaskList } from '@/hooks/useTaskList';
const {
  page,
  onScrollToLower,
  onScrollViewRefresh,
  getTaskList,
  isTriggered,
  isEmpty,
  taskListArr,
} = useTaskList(2);

onLoad(() => {
  getTaskList();
});
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
