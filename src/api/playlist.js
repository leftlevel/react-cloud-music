import http from '../utils/http'

// 获取精品歌单
export function getTopPlaylists(params) {
  return http({
    url: '/top/playlist/highquality',
    method: 'get',
    params
  })
}

// 获取播放歌单
export function getPlaylists(params) {
  return http({
    url: '/top/playlist',
    method: 'get',
    params
  })
}

// 获取相似歌单
export function getSimiPlaylists(id, option) {
  return http({
    url: `/simi/playlist?id=${id}`,
    method: 'get',
    params: option
  })
}