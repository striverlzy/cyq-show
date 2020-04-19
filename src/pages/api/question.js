import Request from '@/utils/request'

const baseUrl = 'question/question'

// 多条件分页查询
export function getQuestion(params = {
  userId: '',
  userName: '',
  title: '',
  content: '',
  searchState: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/question/search', params)
}

// 问题发布
export function publishQuestion(params = {
  userId: '',
  userName: '',
  userImage: '',
  title: '',
  categoryId: '',
  categoryName: '',
  content: ''
}) {
  return Request.post(baseUrl + '/publish', params)
}

// 回复
export function replySearch(params = {
  questionId: '',
  userImage: '',
  title: '',
  userId: '',
  userName: '',
  content: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/reply/search', params)
}

