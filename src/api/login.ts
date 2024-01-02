import { http } from '@/utils/http'

import type { loginParamsType } from './types/login-type'

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
