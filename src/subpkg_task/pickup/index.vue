<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        v-model="receiptPictrues"
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传回单凭证"
      ></uni-file-picker>
      <uni-file-picker
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传货品照片"
        v-model="goodsPictrues"
      ></uni-file-picker>
    </view>
    <button @click="submit" class="button">提交</button>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { takeDelivery } from '@/api/task';
import type { CargoPickUpPictureList, CargoPictureList } from '@/api/types/task-type';
import { onLoad } from '@dcloudio/uni-app';

// 回单凭证
const receiptPictrues = ref<CargoPickUpPictureList[]>([]);
// 货品照片
const goodsPictrues = ref<CargoPictureList[]>([]);

// 提货凭证照片数组
const cargoPickUpPictureList = computed(() => {
  return receiptPictrues.value.map(({ url }) => {
    return { url };
  });
});

// 提货照片数组
const cargoPictureList = computed(() => {
  return goodsPictrues.value.map(({ url }) => {
    return { url };
  });
});

// 司机作业id
const id = ref<string>();

onLoad((options) => {
  id.value = options?.id;
});

// 司机作业id

// 提交方法
const submit = async () => {
  console.log('receiptPictrues', receiptPictrues.value);
  console.log('goodsPictrues', goodsPictrues.value);
  console.log('cargoPickUpPictureList', cargoPickUpPictureList.value);
  console.log('cargoPictureList', cargoPictureList.value);
  try {
    const res = await takeDelivery({
      cargoPickUpPictureList: cargoPickUpPictureList.value,
      cargoPictureList: cargoPictureList.value,
      id: id.value as string,
    });

    if (res.code !== 200) return uni.utils.toast('提交数据失败！');

    // 去到任务列表
    uni.reLaunch({ url: '/subpkg_task/detail/index?jobId=' + id.value });
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30rpx;
}
.receipt-info {
  min-height: 600rpx;
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-radius: 16rpx;
}

::v-deep .uni-file-picker {
  margin-bottom: 30rpx;
}

.button {
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  /* #ifdef APP */
  padding-top: 4rpx;
  /* #endif */
  border-radius: 100rpx;
  margin-top: 60rpx;
  color: #fff;
  font-size: $uni-font-size-big;
  background-color: $uni-main-color;

  &[disabled] {
    color: #fff;
    background-color: #fadcd9;
  }
}
</style>
