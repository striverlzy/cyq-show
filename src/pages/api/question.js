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


// 点赞 findByQuestionId
export function questionThumbup(questionId) {
  return Request.get(baseUrl + '/thumbup?questionId=' + questionId)
}

// 根据Id查询 findByQuestionId
export function findByQuestionId(questionId) {
  return Request.get(baseUrl + '/findByQuestionId?questionId=' + questionId)
}

// 取消点赞
export function unQuestionThumbup(replyId) {
  return Request.get(baseUrl + '/unthumbup?questionId=' + questionId)
}



