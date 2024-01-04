<template>
  <view class="page-container">
    <view class="tab">
      <view
        @click="onTabChange(index)"
        class="tab-item"
        v-for="(item, index) in tabMetas"
        :key="index"
      >
        <view class="title" :class="{ active: tabIndex === index }">
          {{ item.title }}
        </view>
      </view>
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
  /* #endif */
}

.tab {
  display: flex;
  background-color: #fff;
  /**TODO 后面讲解**/
  // padding: calc(env(safe-area-inset-top) + 13px) 60rpx 0;
  font-size: 36rpx;
  .tab-item {
    height: 88rpx;
    margin-right: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      color: #818181;
      position: relative;

      &.active {
        color: #2a2929;
        font-weight: 500;

        &::after {
          content: '';
          display: block;
          background: #d8d8d8;
          background-image: linear-gradient(210deg, #f25c4d 25%, #e52d21 100%, #e52d21 100%);
          border-radius: 20rpx;
          border-radius: 4rpx;
          width: 100%;
          height: 8rpx;
          position: absolute;
          bottom: -25rpx;
        }
      }
    }
  }
}

.task-list {
  flex: 1;
  background-color: red;
  // overflow: hidden;
}
</style>
