import { playModeMap } from './config'

export function createSong(song) {
  const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest} = song

  return {
    id,
    name,
    img,
    artists,
    duration,
    mvId,
    // 专辑，如果需要额外请求封面的话需要加上
    albumId,
    albumName,
    durationSecond: duration / 1000,
    artistsText: genArtistisText(artists),
    url: genSongPlayUrl(id),
    ...rest
  }
}

export function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

/**
 * @description: 搜索栏相关工具函数
 * @param {*} artists
 * @return {*}
 */
export function genArtistisText(artists) {
  return (artists || []).map(({ name }) => name).join('/')
}

/**
 * @description: 生成创建的歌单列表
 * @param {*} userPlaylist
 * @param {*} userId
 * @return {*}
 */
export function genCreatePlaylist(userPlaylist, userId) {
  return userPlaylist.filter(playlist => playlist.userId === userId)
}

/**
 * @description: 生成收藏的歌单列表
 * @param {*} userPlaylist
 * @param {*} userId
 * @return {*}
 */
export function genCollectPlaylist(userPlaylist, userId) {
  return userPlaylist.filter(playlist => playlist.userId !== userId)
}

/**
 * @description: 将各类型的歌单列表处理成符合路由跳转的形式
 * @param {*} playlist
 * @return {*}
 */
export function genPlaylist(playlist) {
  return playlist.map(({ id, name, coverImgUrl, trackCount }) => {
    return {
      path: `/playlists/${id}`,
      title: name,
      avatar: coverImgUrl,
      num: trackCount
    }
  })
}