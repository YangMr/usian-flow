// 任务列表接口所需要的参数类型
export type taskParamsType = {
  /**
   * 结束时间
   */
  endTime?: string
  /**
   * 页码
   */
  page: number
  /**
   * 页面大小
   */
  pageSize: number
  /**
   * 开始时间
   */
  startTime?: string
  /**
   * 作业状态，1为待提货）、2为在途(在途和已交付)、3为改派、5为已作废、6为已完成（已回车登记）
   */
  status: number
  /**
   * 运输任务id
   */
  transportTaskId?: string
}
// 任务列表接口返回数据所需要的类型
export type taskResponseType = {
  /**
   * 总条目数
   */
  counts: number
  /**
   * 数据列表
   */
  items: TaskItemType[] | null
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

export type TaskItemType = {
  /**
   * 实际到达时间
   */
  actualArrivalTime: string
  /**
   * 实际发车时间
   */
  actualDepartureTime: string
  /**
   * 创建时间
   */
  created: string
  /**
   * 司机id
   */
  driverId: string
  /**
   * 是否可提货
   */
  enablePickUp: boolean
  /**
   * 目的机构地址
   */
  endAddress: string
  /**
   * 目的机构id
   */
  endAgencyId: number
  /**
   * 交付对接人
   */
  finishHandover: string
  /**
   * 司机作业单id
   */
  id: string
  /**
   * 计划到达时间
   */
  planArrivalTime: string
  /**
   * 计划发车时间
   */
  planDepartureTime: string
  /**
   * 起始机构地址
   */
  startAddress: string
  /**
   * 起始机构id
   */
  startAgencyId: number
  /**
   * 提货对接人
   */
  startHandover: string
  /**
   * 作业状态，作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废
   */
  status: string
  /**
   * 运输任务id
   */
  transportTaskId: string
}
