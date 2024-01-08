import { taskList } from '@/api/task';
import type { TaskItemType } from '@/api/types/task-type';
import { ref } from 'vue';

export const useTaskList = (
  status: number,
  transportTaskId: string = '',
  endTime: string = '',
  startTime: string = '',
) => {
  // 页码
  const page = ref<number>(1);
  // 条数
  const pageSize = ref<number>(5);
  // 下拉刷新的状态 false 未开启下拉刷新 true开启下拉刷新
  const isTriggered = ref<boolean>(false);
  // 是否还有数据 true 表示有数据， false没有数据
  const hasMore = ref<boolean>(true);
  // 初始化一个变量， 用来控制是否展示空数据 false 有数据 true 没有数据
  const isEmpty = ref(true);
  // 初始化一个变量， 保存请求到的任务列表数据
  const taskListArr = ref<TaskItemType[]>([]);

  // 获取任务列表数据
  const getTaskList = async () => {
    try {
      // 调用任务列表接口
      const res = await taskList({
        page: page.value,
        pageSize: pageSize.value,
        status,
        transportTaskId,
        endTime,
        startTime,
      });
      // 判断请求是否成功
      if (res.code !== 200) return uni.utils.toast('获取列表失败，稍后重试！');

      // 如果页码为第一页，则需要将数据清空
      if (page.value === 1) taskListArr.value = [];

      // 合并数据
      taskListArr.value = [...taskListArr.value, ...(res.data.items || [])];

      // 页码++
      page.value++;

      console.log('page.value', page.value);
      // 如果当前的页码大于等于总页码， 则需要将hasMore设置为false， 表示数据加载完成
      if (page.value > res.data.pages) hasMore.value = false;

      // 如果
      if (taskListArr.value.length > 0) isEmpty.value = false;
    } catch (error) {
      console.log('error', error);
    }
  };

  // 上拉加载
  const onScrollToLower = () => {
    // 接口没有数据， 不在进行数据请求
    if (!hasMore.value) return;
    getTaskList();
  };

  // 下拉刷新
  const onScrollViewRefresh = async () => {
    // 开启下拉刷新状态
    isTriggered.value = true;
    // 页码重置为1
    page.value = 1;
    // 获取数据
    await getTaskList();
    // 结束下拉刷新
    isTriggered.value = false;
  };

  return {
    page,
    pageSize,
    isTriggered,
    hasMore,
    isEmpty,
    taskListArr,
    getTaskList,
    onScrollToLower,
    onScrollViewRefresh,
  };
};
