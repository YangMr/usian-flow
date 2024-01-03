import { http } from '@/utils/http'
import type { responseMessageListType, messageParamsType } from './types/message-type'

/**
 * 分页查询消息列表接口
 * @param messageParams
 */

export const messgeList = (messageParams: messageParamsType) => {
  return http<responseMessageListType>({
    url: '/driver/messages/page',
    method: 'GET',
    data: messageParams,
  })
}

/**
 * 根据类型查询未读消息数量
 * @param contentType
 */
export const messagesCount = (contentType: number) => {
  return http<number>({
    url: `/driver/messages/countType/${contentType}`,
    method: 'GET',
  })
}

/**
 * 全部已读接口
 * @param contentType
 */
export const readAll = (contentType: number) => {
  return http({
    url: `/driver/messages/readAll/${contentType}`,
    method: 'PUT',
  })
}

/**
 * 标记已读
 * @param id
 */
export const read = (id: number | string) => {
  return http({ url: `/driver/messages/${id}`, method: 'PUT' })
}
