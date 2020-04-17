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
