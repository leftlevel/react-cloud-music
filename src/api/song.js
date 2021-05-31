import http from '../utils/http'

// 获取新歌音乐列表数据
export function getTopSongs(type, id) {
  return http({
    url: '/top/song',
    method: 'get',
    params: { type } 
  })
}

// 获取歌词
export function getLyric(id) {
  return http({
    url: '/lyric',
    method: 'get',
    params: id
  })
}

// 获取相似音乐
export function getSimiSongs(id, option) {
  return http({
    url: '/simi/song',
    method: 'get',
    params: { id, option }
  })
}

// 歌单详情
export function getListDetail(params) {
  return http({
    url: '/playlist/detail',
    method: 'get',
    params
  })
}

// 音乐详情
export function getSongDetail(ids) {
  return http({
    url: `/song/detail?ids=${ids}`,
    method: 'get',
  })
}