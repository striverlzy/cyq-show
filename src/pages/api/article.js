import Request from '@/utils/request'

const baseUrl = 'article/article'

// 添加文章
export function toSubmit(params) {
  return Request.post(baseUrl + '/add/article', params)
}

// 多条件分页查询
export function findSearchArticle(params = {
  categoryId: '',
  filterContent: '',
  title: '',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/article/search', params)
}

// 根据文章id查询
export function getArticleByCategoryId(id) {
  return Request.get('article/article/getArticleByCategoryId?categoryId=' + id)
}

// 分类查询
export function getArticleById(id) {
  return Request.get(baseUrl + '/findByArticleId?articleId=' + id)
}

// 获取分类名
export function getCategory() {
  return Request.get('article/category/getcategory')
}

// 收藏
export function collectionArticle(params = {
  artilceId: '',
  artilceTitle: '',
  userId: '',
  userImage: "",
  userName: ""
}) {
  return Request.post(baseUrl + '/collection', params)
}

// 查看收藏
export function searchCollection(params = {
  artilceId: '',
  artilceTitle: '',
  userId: '',
  userImage: "",
  userName: ""
}) {
  return Request.post(baseUrl + '/search/collection', params)
}

// 取消收藏
export function unCollection(articleId) {
  return Request.get(baseUrl + '/unCollection?articleId=' + articleId)
}


// 点赞
export function thumbup(articleId) {
  return Request.get(baseUrl + '/thumbup/article?articleId=' + articleId)
}
