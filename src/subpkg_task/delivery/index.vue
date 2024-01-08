<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        file-extname="jpg,webp,gif,png"
        limit="3"
        title="请拍照上传回单凭证"
        v-model="receiptPictrues"
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
import type { CargoPickUpPictureList, CargoPictureList } from '@/api/types/task-type';
import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import { deliver } from '@/api/task.ts';
// 回单凭证
const receiptPictrues = ref<CargoPickUpPictureList[]>([]);
// 货品照片
const goodsPictrues = ref<CargoPictureList[]>([]);

// 交付图片列表
const deliverPictureList = computed(() => {
  return receiptPictrues.value.map(({ url }) => {
    return { url };
  });
});
// 交付凭证列表
const certificatePictureList = computed(() => {
  return goodsPictrues.value.map(({ url }) => {
    return { url };
  });
});

// 司机作业id
const id = ref<string>();

onLoad((options) => {
  id.value = options?.id;
});

// 提交方法
const submit = async () => {
  try {
    const res = await deliver({
      id: id.value,
      deliverPictureList: deliverPictureList.value,
      certificatePictureList: certificatePictureList.value,
    });
    if (res.code !== 200) return uni.utils.toast('上传图片失败!');

    // 去到任务列表（查看在途任务）
    uni.reLaunch({ url: '/pages/task/index' });
  } catch (error) {
    console.log(error);
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
