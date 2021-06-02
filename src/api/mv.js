import http from '../utils/http'

// 获取全部 mv
export function getAllMvs(params) {
  return http({
    url: '/mv/all',
    method: 'get',
    params
  })
}

// 获取 mv 数据
export function getMvDetails(id) {
  return http({
    url: `/mv/detail?mvid=${id}`,
    method: 'get',
  })
}

// 获取相似 mv
export function getSimiMv(id) {
  return http({
    url: `/simi/mv?mvid=${id}`,
    method: 'get',
  })
}

// 获取 mv 地址
export function getMvUrl(id) {
  return http({
    url: `/mv/url?id=${id}`,
    method: 'get',
  })
}

// 获取歌手单曲
export function getArtists(id) {
  return http({
    url: `/artists?id=${id}`,
    method: 'get',
  })
}