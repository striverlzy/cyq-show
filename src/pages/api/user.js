import Request from '@/utils/request'

const baseUrl = 'user/user'

// 登录
export function toLogin(loginMap = {text: '', password: ''}) {
  return Request.post(baseUrl + '/login', loginMap)
}


export function getUserById(id) {
  return Request.get(baseUrl + '/findById?id=' + id)
}

export function toSendsms(mobile) {

  return Request.get(baseUrl + '/sendsms?mobile=' + mobile)
}


export function toRegister(params = {
  username: '',
  mobile: '',
  code: '',
  userImage: '',
  password: '',
  age: '',
  sex: ''
}) {
  return Request.post(baseUrl + '/register', params)
}

