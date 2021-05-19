import http from '../utils/http'

export function getSearchHot() {
  return http({
    url: '/search/hot',
    method: 'get'
  })
}

export function getSearchSuggest(keywords) {
  return http({
    url: '/search/suggest',
    method: 'get',
    params: { keywords }
  })
}

export function getSearch(params) {
  return http({
    url: '/search',
    method: 'get',
    params
  })
}