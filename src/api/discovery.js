import http from '../utils/http'

// 获取轮播图数据
export function getBanner(type) {
  return http({
    url: '/banner',
    method: 'get',
    params: { type }
  })
}

// 获取推荐歌单数据
export function getPersonalized(params) {
  return http({
    url: '/personalized',
    method: 'get',
    params
  })
}

// 最新音乐数据
export function getNewSongs() {
  return http({
    url: '/personalized/newsong',
    method: 'get',
  })
}

// 推荐mv数据
export function getPersonalizedMv() {
  return http({
    url: '/personalized/mv',
    method: 'get'
  })
}