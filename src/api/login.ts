import { http } from '@/utils/http'

type loginParamsType = {
  account: string
  password: string
}

export const login = (loginParams: loginParamsType) => {
  return http<string>({
    url: '/driver/login/account',
    method: 'POST',
    data: loginParams,
  })
}
