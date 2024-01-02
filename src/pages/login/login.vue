<template>
  <view class="user-login">
    <!-- 登录类型 -->
    <view class="login-type">
      <view class="title">{{ tabMeta.title }}</view>
      <view class="type">
        <text @click="handleChangeType">{{ tabMeta.subTitle }}</text>
        <text class="iconfont icon-caret"></text>
      </view>
    </view>
    <!-- 登录表单 -->
    <IMobile v-if="tabIndex === 0"></IMobile>
    <IAccount v-else></IAccount>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import IAccount from './components/account.vue'
import IMobile from './components/mobile.vue'
import type { metaType } from './types/type'

// 控制默认选中的状态 0手机号登录 1账号登录
const tabIndex = ref<number>(0)

// 定义的元数据
const tabMetas = ref<metaType[]>([
  {
    title: '手机号登录',
    subTitle: '账号登录',
  },
  {
    title: '账号登录',
    subTitle: '手机号登录',
  },
])

// 获取默认的数据
const tabMeta = computed(() => {
  return tabMetas.value[tabIndex.value]
})

// 切换类型
const handleChangeType = () => {
  tabIndex.value = Math.abs(tabIndex.value - 1)
}
</script>

<style lang="scss">
@import './login.scss';
</style>
