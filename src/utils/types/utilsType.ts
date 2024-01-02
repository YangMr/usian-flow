// 定义icon类型
export type icon = 'none' | 'success' | 'error' | 'fail' | 'exception' | 'loading'

export type utilsType = {
  toast: (title: string, icon: icon, mask: boolean) => void
}
