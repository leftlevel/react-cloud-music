import http from '../utils/http'

export function getUserDetail(uid) {
  return http({
    url: '/user/detail',
    method: 'get',
    params: { uid }
  })
}

export function getPlaylist(uid) {
  return http({
    url: '/user/playlist',
    method: 'get',
    params: { uid }
  })
}