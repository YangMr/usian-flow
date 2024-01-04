import { http } from '@/utils/http'
import type { responseTaskDetailType, taskParamsType, taskResponseType } from './types/task-type'

/**
 * 任务列表接口
 * @param taskParams
 * @returns
 */
export const taskList = (taskParams: taskParamsType) => {
  return http<taskResponseType>({
    url: '/driver/tasks/list',
    method: 'GET',
    data: taskParams,
  })
}

/**
 * 任务详情接口
 * @param jobId
 */
export const taskDetail = (jobId: string) => {
  return http<responseTaskDetailType>({
    url: `/driver/tasks/details/${jobId}`,
    method: 'GET',
  })
}
