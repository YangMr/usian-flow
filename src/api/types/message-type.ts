// 消息列表的参数类型
export type messageParamsType = {
  contentType: number
  page: number
  pageSize: number
}

// 消息列表返回的数据类型
export type responseMessageListType = {
  /**
   * 总条目数
   */
  counts: number
  items: Item[]
  /**
   * 页码
   */
  page: number
  /**
   * 总页数
   */
  pages: number
  /**
   * 页尺寸
   */
  pageSize: number
}

export type Item = {
  /**
   * 1：用户端，2：司机端，3：快递员端，4：后台管理系统
   */
  bussinessType: number
  /**
   * 消息内容
   */
  content: string
  /**
   * 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
   */
  contentType: number
  /**
   * 创建时间
   */
  created: string
  /**
   * 创建者
   */
  createUser: number
  /**
   * 主键
   */
  id: number
  /**
   * 消息是否已读，0：未读，1：已读
   */
  isRead: number
  /**
   * 读时间
   */
  readTime: string
  /**
   * 相关id
   */
  relevantId: number
  /**
   * 消息标题
   */
  title: string
  /**
   * 更新时间
   */
  updated: string
  /**
   * 更新者
   */
  updateUser: number
  /**
   * 消息接受者
   */
  userId: number
}
