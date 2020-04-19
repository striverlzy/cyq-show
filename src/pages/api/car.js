import Request from '@/utils/request'

const baseUrl = 'carwork/carwork'

// 驾照查询
export function carSearch(params = {
  cardEngine: '',
  cardNumber: '',
  cardType: '',
  idCard: ''

}) {
  return Request.post(baseUrl + '/carwork/search', params)
}

// 购车查询
export function carRecommend(params = {
  categoryName: '',
  carType: '',
  price: '',
}) {
  return Request.post(baseUrl + '/carrecommend/search', params)
}

