import http from '../utils/http'

// 单曲评论
export function getSongComment(params) {
  return http({
    url: '/comment/music',
    method: 'get',
    params
  })
}

// 歌单评论
export function getPlaylistComment(params) {
  return http({
    url: '/comment/playlist',
    method: 'get',
    params
  })
}

// 热门评论
export function getHotComment(params) {
  return http({
    url: '/comment/hot',
    method: 'get',
    params
  })
}

// mv评论
export function getMvComment(params) {
  return http({
    url: '/comment/mv',
    method: 'get',
    params
  })
}