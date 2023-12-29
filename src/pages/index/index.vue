<template>
  <view class="content">
    <button @click="send">发送</button>
  </view>
</template>

<script setup lang="ts">
import { http } from '@/utils/http'
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const send = () => {
  // promise 进行中  成功 .then 失败  catch
  http({
    // 登录接口
    url: '/driver/login/account',
    method: 'POST',
    data: {
      account: 'xbsj001',
      password: '123456789',
    },
  })
    .then((res) => {
      console.log('Res=>', res)
      store.token = res.data.token
    })
    .catch((error) => {
      console.log('error', error)
    })

  // http({
  //   url: "/driver/tasks/list",
  //   method: "GET",
  //   data: {
  //     page: 1,
  //     pageSize: 5,
  //     status: 1,
  //   },
  // })
  //   .then((res) => {
  //     console.log("Res=>", res);
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //   });
  // uni.request({
  //   url: "https://slwl-api.itheima.net/driver/login/account",
  //   method: "POST",
  //   data: {
  //     account: "xbsj001",
  //     password: "123456",
  //   },
  //   header: {
  //     b: 2,
  //   },
  //   success: (response) => {
  //     console.log("response=>", response);
  //   },
  // });

  // uni.request({
  //   url: "/driver/login/account",
  //   method: "POST",
  //   data: {
  //     account: "xbsj001",
  //     password: "123456",
  //   },
  //   success: (response) => {
  //     console.log("response=>", response);
  //   },
  // });

  // uni.request({
  //   url: "/driver/login/account",
  //   method: "POST",
  //   data: {
  //     account: "xbsj001",
  //     password: "123456",
  //   },
  //   success: (response) => {
  //     console.log("response=>", response);
  //   },
  // });
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
