import { http } from '@/utils/http'

import type {
  loginParamsType,
  responseProfileType,
  taskReportParamsType,
  responseTaskReportType,
  responseTruckType,
} from './types/login-type'

/**
 * 登录接口
 * @param loginParams
 * @returns
 */
export const login = (loginParams: loginParamsType) => {
  return http<string>({
    url: '/driver/login/account',
    method: 'POST',
    data: loginParams,
  })
}

/**
 * 获取用户信息接口
 */
export const profile = () => {
  return http<responseProfileType>({
    url: '/driver/users',
    method: 'GET',
  })
}

/**
 * 获取任务数据接口
 * @param taskReportParams
 */
export const taskReport = (taskReportParams: taskReportParamsType) => {
  return http<responseTaskReportType>({
    url: '/driver/users/taskReport',
    method: 'GET',
    data: taskReportParams,
  })
}

/**
 * 获取车辆信息接口
 */
export const truck = () => {
  return http<responseTruckType>({
    url: '/driver/users/truck',
    method: 'GET',
  })
}
