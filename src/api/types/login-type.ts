// 登录参数类型
export type loginParamsType = {
  account: string
  password: string
}
// 任务数据的请求参数类型
export type taskReportParamsType = {
  /**
   * 月
   */
  month: string | number
  /**
   * 年
   */
  year: string | number
}

// 请求用户信息接口返回的数据类型
export type responseProfileType = {
  /**
   * 头像
   */
  avatar: string
  /**
   * 姓名
   */
  name: string
  /**
   * 司机编号
   */
  number: string
  /**
   * 手机号
   */
  phone: string
}

// 请求任务数据返回的数据类型
export type responseTaskReportType = {
  completedAmounts: number
  /**
   * 每日里程,基于实际完成时间统计
   */
  dailyMileage: DailyMileage[]
  /**
   * 任务数量,基于计划完成时间统计
   */
  taskAmounts: number
  /**
   * 运输里程，单位：公里，基于实际完成时间统计
   */
  transportMileage: number
}

// 日里程,基于实际完成时间统计数据类型
type DailyMileage = {
  dateTime?: string
  /**
   * 里程，单位：公里;计算公式：原始数据（单位米）/1000 四舍五入取整
   */
  mileage?: number
}

// 请求返回车辆信息数据类型
export type responseTruckType = {
  /**
   * 载重
   */
  allowableLoad: string
  /**
   * 所属机构名称
   */
  currentOrganName: string
  /**
   * 车辆编号
   */
  id: string
  /**
   * 车牌号码
   */
  licensePlate: string
  /**
   * 图片
   */
  pictureList: PictureList[]
  /**
   * 车辆类型名称
   */
  truckType: string
}

type PictureList = {
  /**
   * 图片url
   */
  url: string
}
