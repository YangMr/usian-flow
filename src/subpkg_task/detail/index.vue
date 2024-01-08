<template>
  <view class="page-container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <!-- #ifdef APP-PLUS || MP -->
      <text class="iconfont icon-scan"></text>
      <!-- #endif -->

      <!-- #ifdef H5 -->
      <text class="iconfont icon-search"></text>
      <!-- #endif -->

      <input class="input" type="text" placeholder="输入运单号" />
    </view>

    <scroll-view class="task-detail" :scroll-y="true">
      <view class="scroll-view-wrapper">
        <!-- 基本信息模块 -->
        <view class="basic-info panel">
          <!-- 基本信息 -->
          <view class="panel-title">基本信息</view>

          <!-- 起点与终点 -->
          <view class="timeline">
            <view class="line">{{ detailInfo?.startAddress }}</view>
            <view class="line">{{ detailInfo?.endAddress }}</view>
            <navigator hover-class="none" class="guide">
              <text class="iconfont icon-guide"></text>
              <text>开始导航</text>
            </navigator>
          </view>

          <!-- 任务信息 -->
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">任务编号</text>
              <text class="value">{{ detailInfo?.transportTaskId }}</text>
            </view>

            <!-- 待提货展示数据 -->
            <template v-if="detailInfo?.status === 1">
              <view class="info-list-item">
                <text class="label">联系人</text>
                <text class="value">{{ detailInfo?.startHandoverName }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系电话</text>
                <text class="value">{{ detailInfo?.startHandoverPhone }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">预计提货时间</text>
                <text class="value">{{ detailInfo?.planDepartureTime }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">实际提货时间</text>
                <text class="value">{{ detailInfo?.actualDepartureTime }}</text>
              </view>
            </template>

            <view class="hr"></view>

            <!-- 在途展示数据 -->
            <tempate v-if="detailInfo?.status === 2">
              <view class="info-list-item">
                <text class="label">交付联系人</text>
                <text class="value">{{ detailInfo?.finishHandoverName }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">联系电话</text>
                <text class="value">{{ detailInfo?.finishHandoverPhone }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">预计送达时间</text>
                <text class="value">{{ detailInfo?.planArrivalTime }}</text>
              </view>
              <view class="info-list-item">
                <text class="label">实际送达时间</text>
                <text class="value">{{ detailInfo?.actualArrivalTime }}</text>
              </view>
            </tempate>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 待提货 -->
    <view class="toolbar" v-if="detailInfo?.status === 1">
      <navigator
        :url="`/subpkg_task/delay/index?id=${detailInfo?.id}&planDepartureTime=${detailInfo?.planDepartureTime}`"
        hover-class="none"
        class="button secondary"
      >
        延迟提货
      </navigator>
      <navigator
        :url="`/subpkg_task/pickup/index?id=${detailInfo?.id}`"
        hover-class="none"
        class="button primary"
        >提货</navigator
      >
    </view>
    <!-- 在途 -->
    <view class="toolbar" v-if="detailInfo?.status === 2">
      <navigator
        :url="`/subpkg_task/except/index?transportTaskId=${detailInfo?.transportTaskId}`"
        hover-class="none"
        class="button secondary"
        >异常上报</navigator
      >
      <navigator
        :url="`/subpkg_task/delivery/index?id=${detailInfo?.id}`"
        hover-class="none"
        class="button primary"
        >交付</navigator
      >
    </view>
    <!-- 已完成 -->
    <view class="toolbar" v-if="detailInfo?.status === 4">
      <navigator
        :url="`/subpkg_task/record/index?id=${detailInfo?.transportTaskId}&startTime=${detailInfo?.actualDepartureTime}`"
        hover-class="none"
        class="button primary block"
      >
        回车登记
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import type { responseTaskDetailType } from '@/api/types/task-type';
import { taskDetail } from '@/api/task';

// 初始化一个变量,保存作业id
const id = ref<string>();

onLoad((options) => {
  id.value = options?.jobId;
});

onShow(() => {
  getTaskDetail();
});

const detailInfo = ref<responseTaskDetailType>();
const getTaskDetail = async () => {
  try {
    const res = await taskDetail(id.value as string);
    console.log('res=>', res);
    detailInfo.value = res.data;
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
}

.search-bar {
  position: relative;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;

  .icon-scan,
  .icon-search {
    position: absolute;
    top: 50%;
    left: 40rpx;
    padding: 20rpx;
    font-weight: 600;
    transform: translateY(-50%);
    color: $uni-secondary-color;
    font-size: $uni-font-size-base;
  }

  .input {
    height: 64rpx;
    background-color: #f4f4f4;
    border-radius: 64rpx;
    padding-left: 80rpx;
    font-size: $uni-font-size-small;
  }
}

.task-detail {
  flex: 1;
  overflow: hidden;

  .panel {
    padding: 30rpx 30rpx 20rpx;
    margin: 30rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }

  .panel-title {
    padding-bottom: 10rpx;
    margin-bottom: 30rpx;
    font-size: $uni-font-size-base;
    color: $uni-main-color;
  }

  .info-list {
    padding: 20rpx 10rpx 0;
    margin-top: 40rpx;
    border-top: 2rpx solid #f4f4f4;
  }

  .info-list-item {
    display: flex;
    justify-content: space-between;
    line-height: 1;
    padding: 20rpx 0;
    font-size: $uni-font-size-small;

    .label {
      color: $uni-secondary-color;
    }

    .value {
      color: $uni-main-color;
    }
  }
}

.basic-info {
  .hr {
    border-top: 1rpx solid #f4f4f4;
    margin: 20rpx 0;
  }

  .timeline {
    min-height: 110rpx;
    position: relative;
    padding: 0 140rpx 0 30rpx;
    margin-left: 30rpx;
    border-left: 2rpx dashed #f4f4f4;

    &::before,
    &::after {
      position: absolute;
      left: -24rpx;
      width: 44rpx;
      height: 44rpx;
      text-align: center;
      line-height: 44rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 50%;
      background-color: pink;
    }

    &::before {
      content: '起';
      top: -1rpx;
      background-color: $uni-main-color;
    }

    &::after {
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

    .guide {
      position: absolute;
      right: 0;
      top: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      font-size: 24rpx;
      transform: translateY(-50%);

      .iconfont {
        margin-bottom: 10rpx;
        font-size: 40rpx;
      }
    }
  }
}

.except-info {
  .panel-title {
    margin-bottom: 10rpx;
  }

  .info-list {
    border-top: none;
    padding: 0 10rpx 10rpx;
    margin-top: 0;

    &:last-child {
      border-top: 2rpx solid #f4f4f4;
      padding-top: 10rpx;
      padding-bottom: 0;
    }
  }
}

.pickup-info,
.delivery-info {
  .panel-title {
    margin-bottom: 20rpx;
  }

  .label {
    font-size: $uni-font-size-small;
    color: $uni-secondary-color;
  }

  .pictures {
    min-height: 190rpx;
    position: relative;
  }

  .picture {
    width: 190rpx;
    height: 190rpx;
    margin: 20rpx 30rpx 20rpx 0;
    border-radius: 8rpx;
    background-color: #f4f4f4;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

.picture-blank {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 201rpx;
  text-align: center;
  padding-top: 130rpx;
  background-image: url(https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/blank%402x.png);
  background-size: contain;
  background-repeat: no-repeat;
  font-size: 24rpx;
  color: $uni-secondary-color;
  transform: translate(-50%, -50%) scale(0.7);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 30rpx calc(env(safe-area-inset-bottom) + 30rpx);
  font-size: $uni-font-size-base;
  background-color: #fff;

  .button {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    /* #ifdef APP */
    padding-top: 4rpx;
    /* #endif */
    border-radius: 100rpx;
    font-size: $uni-font-size-big;
  }

  .secondary {
    width: 250rpx;
    color: $uni-main-color;
    background-color: #e6e6e6;
  }

  .primary {
    width: 400rpx;
    color: #fff;
    background-color: $uni-primary;

    &.block {
      width: 690rpx;
    }

    &[disabled] {
      background-color: #fadcd9;
    }
  }
}
</style>
