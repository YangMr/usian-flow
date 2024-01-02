// 表单校验规则
import { reactive } from 'vue'
export const accountRules = reactive({
  account: {
    rules: [
      { required: true, errorMessage: '请输入登录账号' },
      { pattern: '^[a-zA-Z0-9]{6,8}$', errorMessage: '登录账号格式不正确' },
    ],
  },
  password: {
    rules: [
      { required: true, errorMessage: '请输入登录密码' },
      { pattern: '^\\d{6}', errorMessage: '登录密码格式不正确' },
    ],
  },
})
