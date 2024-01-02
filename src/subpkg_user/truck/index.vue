<template>
  <view class="page-container">truck</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { responseTruckType } from '@/api/types/login-type.ts'
import { truck } from '@/api/login'
import { onLoad } from '@dcloudio/uni-app'
// 保存车辆信息变量
const truckInfo = ref<responseTruckType>()

// 获取车辆信息方法
const getTruckInfo = async () => {
  try {
    const res = await truck()
    console.log('res=>', res)
    truckInfo.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}

onLoad(() => {
  getTruckInfo()
})
</script>

<style lang="scss" scoped></style>
