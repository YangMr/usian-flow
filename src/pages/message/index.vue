<template>
  <view class="page-container">
    <view class="message-tabbar">
      <text
        v-for="(tabMeta, index) in tabMetas"
        :key="index"
        :class="{ active: tabIndex === index }"
        @click="onTabChange(index)"
        class="tab"
        >{{ tabMeta.title }}</text
      >
    </view>

    <view class="message-list" v-show="tabIndex === 0">
      <UAnnounce></UAnnounce>
    </view>
    <view class="message-list" v-show="tabIndex === 1">
      <UNotify></UNotify>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import UAnnounce from './components/u-announce.vue'
import UNotify from './components/u-notify.vue'

type tabMetasType = {
  title: string
  rendered: boolean
}

// Tab 标签页索引
const tabIndex = ref<number>(0)
const tabMetas = reactive<tabMetasType[]>([
  {
    title: '公告',
    rendered: true,
  },
  {
    title: '任务通知',
    rendered: false,
  },
])

const onTabChange = (index: number) => {
  tabIndex.value = index
}
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  /* #ifdef H5 */
  height: calc(100vh - 94px);
  /* #endif */
}

.message-tabbar {
  height: 80rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: $uni-font-size-base;
  background-color: #fff;
  color: $uni-secondary-color;
  border-bottom: 1rpx solid #eee;

  .active {
    color: $uni-main-color;
    font-weight: 500;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -20rpx;
      width: 46rpx;
      height: 8rpx;
      border-radius: 8rpx;
      transform: translate(-50%);
      background-image: linear-gradient(210deg, #f25c4d 25%, #e52d21 100%, #e52d21 100%);
    }
  }
}

.message-list {
  flex: 1;
}
</style>
