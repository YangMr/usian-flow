<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="uni-list">
          <uni-list-item show-arrow title="异常时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="timePicker">
                <view class="picker-value">{{ exceptionTime }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>

          <uni-list-item
            show-arrow
            title="上报位置"
            clickable
            ellipsis="1"
            @click="onLocationChoose"
            :right-text="exceptionPlace || '请选择'"
          ></uni-list-item>

          <uni-list-item
            clickable
            @click="onPopupOpen"
            title="异常类型"
            ellipsis="1"
            :right-text="exceptionType || '请选择'"
          >
          </uni-list-item>

          <uni-list-item direction="column" title="异常描述">
            <template v-slot:footer>
              <view class="textarea-wrapper">
                <textarea
                  v-model="exceptionDescribe"
                  class="textarea"
                  placeholder="请输入异常描述"
                ></textarea>
                <view class="words-count">{{ wordsCount }}/50</view>
              </view>
            </template>
          </uni-list-item>

          <uni-list-item
            style="margin-top: -30rpx"
            :border="false"
            direction="column"
            title="上传图片（最多3张）"
          >
            <template v-slot:footer>
              <uni-file-picker
                v-model="goodsPictrues"
                file-extname="jpg,webp,gif,png"
                limit="3"
              ></uni-file-picker>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </scroll-view>

    <view class="fixbar">
      <button @click="onFormSubmit" class="button disable">提交</button>
    </view>
  </view>

  <uni-popup ref="popup" background-color="#fff">
    <uni-list :border="false" class="popup-action-sheet">
      <uni-list-item>
        <template v-slot:header>
          <view class="header">选择类型</view>
        </template>
      </uni-list-item>
      <uni-list-item v-for="(item, index) in exceptionTypes" :key="index" :title="item.text">
        <template v-slot:footer>
          <checkbox-group @change="onCheckboxChange(index)" class="checkbox">
            <checkbox :checked="item.checked" color="#EF4F3F" />
          </checkbox-group>
        </template>
      </uni-list-item>
      <uni-list-item>
        <template v-slot:body>
          <button @click="onPopupConfirm" class="button">确定</button>
        </template>
      </uni-list-item>
    </uni-list>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { reportException } from '@/api/task';
import { onLoad } from '@dcloudio/uni-app';
// 选择的时间
const timePicker = ref('');
// 异常时间
const exceptionTime = computed(() => {
  return timePicker.value || '请选择';
});
// 选择的位置
const exceptionPlace = ref('');
// 打开地图选择位置
const onLocationChoose = async () => {
  console.log('123');
  try {
    const res = await uni.chooseLocation({});
    console.log('Res=>', res);
    exceptionPlace.value = res?.address;
  } catch (error) {
    console.log(error);
  }
};

// 打开弹出层
const popup = ref();
// 选择的异常类型
const exceptionType = ref();
// 定义 popup 组件展示的数据
const exceptionTypes = reactive([
  { text: '发动机启动困难', checked: false },
  { text: '不着车，漏油', checked: false },
  { text: '照明失灵', checked: false },
  { text: '排烟异常、温度异常', checked: false },
  { text: '其他问题', checked: false },
]);
const onPopupOpen = () => {
  popup.value.open('bottom');
};
const onCheckboxChange = (index: number) => {
  exceptionTypes[index].checked = !exceptionTypes[index].checked;
};
// 点击弹出层确定触发的方法
const onPopupConfirm = () => {
  // 让弹出层关闭
  popup.value.close();
  // 过滤取选中的故障类型数据
  exceptionType.value = exceptionTypes
    .filter((type) => {
      return type.checked;
    })
    .map((item) => {
      return item.text;
    })
    .join('|');
};

// 异常描述
const exceptionDescribe = ref();
const wordsCount = computed(() => {
  return exceptionDescribe.value?.length || 0;
});
// 上传图片
const goodsPictrues = ref([]);
const exceptionImagesList = computed(() => {
  return goodsPictrues.value.map(({ url }) => {
    return { url };
  });
});

// 运输任务id
const id = ref<string>();
onLoad((options) => {
  id.value = options?.transportTaskId;
});
// 提交方法
const onFormSubmit = async () => {
  try {
    const res = await reportException({
      transportTaskId: id.value as string,
      exceptionTime: exceptionTime.value,
      exceptionPlace: exceptionPlace.value,
      exceptionType: exceptionType.value,
      exceptionDescribe: exceptionDescribe.value,
      exceptionImagesList: exceptionImagesList.value,
    });
    if (res.code !== 200) return uni.utils.toast('上报数据失败！');
    // 跳转到任务列表页面
    uni.reLaunch({ url: '/pages/task/index' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  border-top: 1rpx solid #eee;
  padding-bottom: env(safe-area-inset-bottom);

  .scroll-view {
    flex: 1;
    overflow: hidden;

    .scroll-view-wrapper {
      overflow: hidden;
    }
  }
}

.uni-list {
  padding: 10rpx 30rpx 0;
  border-radius: 16rpx;
  overflow: hidden;
  margin: 20rpx 30rpx;
}
.picker-value {
  width: 360rpx;
  color: $uni-secondary-color;
  font-size: $uni-font-size-base;
  text-align: right;
}
.fixbar {
  padding: 20rpx 0;
  border-top: 1rpx solid #eee;
  background-color: #fff;
}

.button {
  width: 690rpx;
  height: 100rpx;
  /* #ifdef APP */
  padding-top: 4rpx;
  /* #endif */
  line-height: 100rpx;
  color: #fff;
  font-size: $uni-font-size-big;
  border-radius: 100rpx;
  background-color: $uni-primary;

  &[disabled] {
    background-color: #fadcd9;
  }
}

.popup-action-sheet {
  margin-bottom: 0;
  border-radius: 32rpx 32rpx 0 0;

  .header {
    margin-top: 4rpx;
    font-size: 32rpx;
    font-weight: 700;
  }
}
</style>
