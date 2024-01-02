import { utilsType, icon } from './types/utilsType'

const utils: utilsType = {
  /**
   * 用户反馈（轻提示）
   * @param {string} title 提示文字内容
   * @param {string} icon 提示图标类型
   */
  toast(title: string = '数据加载失败', icon: icon = 'none', mask: boolean = true) {
    uni.showToast({
      title,
      icon,
      mask,
    })
  },
}
uni.utils = utils
