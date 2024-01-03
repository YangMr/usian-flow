<template>
  <view class="page-container">
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in truckInfo?.pictureList" :key="index">
        <image :src="item.url" mode="scaleToFill" />
      </swiper-item>
    </swiper>

    <uni-list :border="false">
      <uni-list-item :right-text="truckInfo?.id" title="车辆编号"></uni-list-item>
      <uni-list-item :right-text="truckInfo?.licensePlate" title="车辆号牌"></uni-list-item>
      <uni-list-item :right-text="truckInfo?.truckType" title="车型"></uni-list-item>
      <uni-list-item :right-text="truckInfo?.currentOrganName" title="所属机构"></uni-list-item>
      <uni-list-item
        :right-text="`${parseInt(truckInfo?.allowableLoad as string)}吨`"
        title="载重"
      ></uni-list-item>
    </uni-list>
  </view>
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
