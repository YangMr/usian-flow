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

export type responseTaskDetailType = {
  /**
   * 实际到达时间
   */
  actualArrivalTime: string
  /**
   * 实际发车时间
   */
  actualDepartureTime: string
  /**
   * 提货凭证
   */
  cargoPickUpPictureList: CargoPickUpPictureList[]
  /**
   * 提货图片
   */
  cargoPictureList: CargoPictureList[]
  /**
   * 回单凭证
   */
  certificatePictureList: CertificatePictureList[]
  /**
   * 回单图片
   */
  deliverPictureList: DeliverPictureList[]
  /**
   * 司机id
   */
  driverId: string
  /**
   * 司机姓名
   */
  driverName: string
  /**
   * 目的市
   */
  endAddress: string
  /**
   * 目的机构id
   */
  endAgencyId: string
  /**
   * 目的机构详细地址
   */
  endCity: string
  /**
   * 目的省份
   */
  endProvince: string
  exceptionList: ExceptionList[]
  /**
   * 交付对接人
   */
  finishHandoverName: string
  /**
   * 交付对接人电话
   */
  finishHandoverPhone: string
  /**
   * 司机作业单id
   */
  id: string
  /**
   * 车牌号码
   */
  licensePlate: string
  /**
   * 计划到达时间
   */
  planArrivalTime: string
  /**
   * 计划发车时间
   */
  planDepartureTime: string
  /**
   * 起始机构详细地址
   */
  startAddress: string
  /**
   * 起始机构id
   */
  startAgencyId: string
  /**
   * 起始市
   */
  startCity: string
  /**
   * 提货对接人
   */
  startHandoverName: string
  /**
   * 提货对接人电话
   */
  startHandoverPhone: string
  /**
   * 起始省份
   */
  startProvince: string
  /**
   * 作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废、6为已完成（已回车登记）
   */
  status: number
  /**
   * 运输任务id
   */
  transportTaskId: string
}

type CargoPickUpPictureList = {
  /**
   * 图片url地址
   */
  url: string
}

type CargoPictureList = {
  /**
   * 图片url地址
   */
  url: string
}

type CertificatePictureList = {
  /**
   * 图片url地址
   */
  url: string
}

type DeliverPictureList = {
  /**
   * 图片url地址
   */
  url: string
}

type ExceptionList = {
  /**
   * 异常描述
   */
  exceptionDescribe: string
  /**
   * 异常图片
   */
  exceptionImagesList: ExceptionImagesList[]
  /**
   * 上报的位置
   */
  exceptionPlace: string
  /**
   * 异常时间
   */
  exceptionTime: string
  /**
   * 异常类型(中文)
   */
  exceptionType: string
  /**
   * 处理结果
   */
  handleResult: string
}

type ExceptionImagesList = {
  /**
   * 图片url
   */
  url: string
}
