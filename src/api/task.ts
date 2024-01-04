import { http } from '@/utils/http'
import type { taskParamsType, taskResponseType } from './types/task-type'

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
