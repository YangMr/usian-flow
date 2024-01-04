<template>
  <view class="page-container">
    <view class="task-tabbar">
      <text
        v-for="(tabMeta, index) in tabMetas"
        :key="tabMeta.title"
        @click="onTabChange(index)"
        :class="{ active: tabIndex === index }"
        class="tab"
      >
        {{ tabMeta.title }}
      </text>
    </view>

    <view class="task-list">
      <UDeliver v-if="tabIndex === 0" />
      <UPickup v-if="tabIndex === 1" />
      <UComplete v-if="tabIndex === 2" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import UDeliver from './components/deliver.vue'
import UPickup from './components/pickup.vue'
import UComplete from './components/complete.vue'

type tabMetasType = {
  title: string
  rendered: boolean
}

// Tab 标签页索引
const tabIndex = ref<number>(0)
const tabMetas = reactive<tabMetasType[]>([
  {
    title: '待提货',
    rendered: true,
  },
  {
    title: '在途',
    rendered: false,
  },
  {
    title: '已完成',
    rendered: true,
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
  height: calc(100vh - 50px);
  /* #endif  */
}
.task-tabbar {
  height: 80rpx;
  padding: calc(env(safe-area-inset-top) + 13px) 60rpx 0;

  /* #ifdef MP-WEIXIN */
  padding: calc(env(safe-area-inset-top) + 35px) 60rpx 0;
  /* #endif */

  /* #ifdef APP */
  padding: calc(env(safe-area-inset-top) + 40px) 60rpx 0;
  /* #endif */

  display: flex;
  align-items: center;
  font-size: $uni-font-size-big;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  color: $uni-secondary-color;

  .tab {
    margin-right: 80rpx;
  }

  .active {
    color: $uni-main-color;
    font-weight: 500;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -18rpx;
      width: 46rpx;
      height: 8rpx;
      border-radius: 8rpx;
      transform: translate(-50%);
      background-color: $uni-primary;
    }
  }
}

.task-list {
  flex: 1;
  overflow: hidden;
}
</style>
