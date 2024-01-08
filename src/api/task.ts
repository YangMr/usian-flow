import { http } from '@/utils/http';
import type {
  responseTaskDetailType,
  taskParamsType,
  taskResponseType,
  takeDeliveryParams,
  deliverParamsType,
  reportExceptionParamsType,
} from './types/task-type';

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
  });
};

/**
 * 任务详情接口
 * @param jobId
 */
export const taskDetail = (jobId: string) => {
  return http<responseTaskDetailType>({
    url: `/driver/tasks/details/${jobId}`,
    method: 'GET',
  });
};

/**
 * 提货接口
 * @param takeDeliveryParams
 */
export const takeDelivery = (takeDeliveryParams: takeDeliveryParams) => {
  return http({
    url: '/driver/tasks/takeDelivery',
    method: 'POST',
    data: takeDeliveryParams,
  });
};

/**
 * 交付接口
 * @param deliverParams
 */
export const deliver = (deliverParams: deliverParamsType) => {
  return http({
    url: '/driver/tasks/deliver',
    method: 'POST',
    data: deliverParams,
  });
};

/**
 * 异常上报接口
 * @param reportExceptionParams
 */
export const reportException = (reportExceptionParams: reportExceptionParamsType) => {
  return http({
    url: '/driver/tasks/reportException',
    method: 'POST',
    data: reportExceptionParams,
  });
};
