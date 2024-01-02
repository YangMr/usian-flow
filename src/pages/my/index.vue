<template>
  <view class="page-container">
    <view class="user-profile">
      <image class="avatar" :src="userProfile?.avatar"></image>
      <view class="username">{{ userProfile?.name }}</view>
      <view class="no">司机编号: {{ userProfile?.number }} </view>
      <view class="mobile">手机号码： {{ userProfile?.phone }}</view>
    </view>

    <view class="month-overview">
      <view class="title">本月任务</view>
      <view class="content">
        <view class="item">
          <text class="volumn">{{ taskInfo?.taskAmounts }}</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ taskInfo?.completedAmounts }}</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ taskInfo?.transportMileage }}</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </view>

    <view class="entry-list">
      <uni-list :border="false">
        <uni-list-item
          v-for="(item, index) in entryList"
          :key="index"
          :to="item.to"
          :showArrow="item.showArrow"
          :title="item.title"
        />
        <!-- <uni-list-item
          to="/subpkg_user/task/index"
          showArrow
          title="任务数据"
        />
        <uni-list-item
          to="/subpkg_user/settings/index"
          showArrow
          title="系统设置"
        /> -->
      </uni-list>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { profile, taskReport } from '@/api/login'
import dayjs from 'dayjs'
import type { responseProfileType, responseTaskReportType } from '@/api/types/login-type'

type entryListType = {
  to: string
  showArrow: boolean
  title: string
}

// 保存入口列表数据
const entryList = ref<entryListType[]>([
  {
    to: '/subpkg_user/truck/index',
    showArrow: true,
    title: '车辆信息',
  },
  {
    to: '/subpkg_user/task/index',
    showArrow: true,
    title: '任务数据',
  },
  {
    to: '/subpkg_user/settings/index',
    showArrow: true,
    title: '系统设置',
  },
])

// 保存请求到的用户信息
const userProfile = ref<responseProfileType>()

// 获取任务数据
const taskInfo = ref<responseTaskReportType>()

// 初始化年
const year = dayjs().year()
// 初始化月
const month = (m: number) => {
  m = m + 1
  return m < 10 ? '0' + m : '' + m
  // if (m < 10) {
  //   return "0" + m;
  // } else {
  //   return "" + m;
  // }
}

// 获取用户信息方法
const getUserProfile = async () => {
  try {
    const res = await profile()
    userProfile.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}

// 获取任务数据方法
const getTaskReport = async () => {
  try {
    const res = await taskReport({
      month: month(dayjs().month()),
      year,
    })
    taskInfo.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}

onLoad(() => {
  // 调用获取用户信息方法
  getUserProfile()
  // 调用获取任务数据方法
  getTaskReport()
})
</script>

<style scoped lang="scss">
.page-container {
  /* #ifdef H5 */
  height: calc(100vh - 50px);
  /* #endif  */

  .user-profile {
    height: 600rpx;
    background-image: url('https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/profile-bg%402x.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    line-height: 1.8;
    font-size: 30rpx;

    .avatar {
      width: 140rpx;
      height: 140rpx;
      margin-top: 90rpx;
      border-radius: 50%;
      border: 6rpx solid rgba(255, 255, 255, 0.4);
    }

    .username {
      font-size: 36rpx;
      margin: 10rpx 0;
    }
  }

  .month-overview {
    height: 268rpx;
    margin: 0 30rpx;
    border-radius: 16rpx;
    background-color: #fff;
    position: relative;
    top: -130rpx;

    .title {
      color: $uni-secondary-color;
      font-size: $uni-font-size-small;
      padding-top: 28rpx;
      text-align: center;

      &::after,
      &::before {
        content: '-';
        margin: 0 5rpx;
      }
    }

    .content {
      display: flex;
      justify-content: space-around;
      text-align: center;
      font-size: $uni-font-size-small;
      color: $uni-main-color;
      margin-top: 40rpx;

      .volumn {
        display: block;
        font-size: 36rpx;
        margin-bottom: 20rpx;
        font-weight: 500;
      }
    }
  }

  .entry-list {
    margin: -100rpx 30rpx 0;
    border-radius: 16rpx;
    overflow: hidden;
  }
}
</style>
