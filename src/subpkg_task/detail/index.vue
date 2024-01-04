<template>
  <view class="detail">
    {{ detailInfo }}
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { responseTaskDetailType } from '@/api/types/task-type'
import { taskDetail } from '@/api/task'

// 初始化一个变量,保存作业id
const id = ref<string>()

onLoad((options) => {
  id.value = options?.jobId
  getTaskDetail()
})

const detailInfo = ref<responseTaskDetailType>()
const getTaskDetail = async () => {
  try {
    const res = await taskDetail(id.value as string)
    console.log('res=>', res)
    detailInfo.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<style lang="scss" scoped></style>
