import Request from '@/utils/request'

const baseUrl = 'gathering/gathering'

// 多条件分页查询
export function getGathering(params = {
  detail: '',
  isHost: '',
  state: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/search', params)
}

// 报名
export function signUp(params = {
  gatheringId: '',
  gatheringTitle: '',
  userId: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/signUp', params)
}

// 报名记录
export function findRecord(params = {
  gatheringId: '',
  gatheringTitle: '',
  userId: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/findRecordByUserId', params)
}

// 根据Id查询
export function findGathingById(gatheringId) {
  return Request.get(baseUrl + '/findGathingById?gatheringId=' + gatheringId)
}
