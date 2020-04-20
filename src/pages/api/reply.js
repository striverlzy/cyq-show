import Request from '@/utils/request'

const baseUrl = 'question/reply'

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

// 回答问题
export function replyQuestion(params = {
  userId: '',
  userName: '',
  content: '',
  userImage: '',
  questionId: ''
}) {
  return Request.post(baseUrl + '/reply/question', params)
}

// 回答点赞
export function replyThumbup(replyId) {
  return Request.get(baseUrl + '/thumbup?replyId=' + replyId)
}

// 回答取消点赞
export function unReplyThumbup(replyId) {
  return Request.get(baseUrl + '/unthumbup?replyId=' + replyId)
}

