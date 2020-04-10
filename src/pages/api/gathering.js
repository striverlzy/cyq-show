import Request from '@/utils/request'

const baseUrl = 'gathering/gathering'

export function getAll() {
  return Request.get(baseUrl)
}
