import { playModeMap } from './config'

/**
 * @description: 创建歌格式
 * @param {*} song
 * @return {*}
 */
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

/**
 * @description: 生成歌曲播放地址
 * @param {*} id
 * @return {*}
 */
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
      path: `/playlist/${id}`,
      title: name,
      avatar: coverImgUrl,
      num: trackCount
    }
  })
}

/**
 * @description: 生成用户歌单
 * @param {*} userPlaylist
 * @param {*} userId
 * @return {*}
 */
export function genUsermenu(userPlaylist, userId) {
  const retMenu = []
  const createPlaylist = genCreatePlaylist(userPlaylist, userId)
  const collectPlaylist = genCollectPlaylist(userPlaylist, userId)

  if (createPlaylist.length) {
    retMenu.push({
      type: 'playlist',
      title: '创建的歌单',
      children: genPlaylist(createPlaylist)
    })
  }
  if (collectPlaylist.length) {
    retMenu.push({
      type: 'playlist',
      title: '收藏的歌单',
      children: genPlaylist(collectPlaylist)
    })
  }
  return retMenu
}

// 播放当前歌曲相关
/**
 * @description: 获取当前播放歌曲的索引
 * @param {*} playList
 * @param {*} currentSong
 * @return {*}
 */
export const currentIndex = (playList, currentSong) => {
  return playList.findIndex(list => list.id === currentSong.id)
}

/**
 * @description: 下一首歌
 * @param {*} playList
 * @param {*} playMode
 * @param {*} currentSong
 * @return {*}
 */
export const nextSong = (playList, playMode, currentSong) => {
  const nextStratMap = {
    [playModeMap.sequence.code]: getSequenceNextIndex,
    [playModeMap.loop.code]: getLoopNextIndex,
    [playModeMap.random.code]: getRandomNextIndex
  }

  const getNextStrat = nextStratMap[playMode]
  const index = getNextStrat()

  return playList[index]
  
  // 获取顺序播放的索引
  function getSequenceNextIndex() {
    let nextIndex = currentIndex(playList, currentSong) + 1
    if (nextIndex > playList.length - 1) {
      nextIndex = 0
    }
    return nextIndex
  }

  // 获取单曲循环的索引
  function getLoopNextIndex() {
    return currentIndex(playList, currentSong)
  }

  // 获取随机播放的索引
  function getRandomNextIndex() {
    const index = currentIndex(playList, currentSong)
    return getRandomIndex(playList, index)
  }
}

/**
 * @description: 上一首歌
 * @param {*} playList
 * @param {*} playMode
 * @param {*} currentSong
 * @return {*}
 */
export const prevSong = (playList, playMode, currentSong) => {
  const prevStratMap = {
    [playModeMap.sequence.code]: getSequencePrevIndex,
    [playModeMap.loop.code]: getLoopPrevIndex,
    [playModeMap.random.code]: getRandomPrevIndex
  }
  
  const getPrevStrat = prevStratMap[playMode]
  const index = getPrevStrat()
  
  return playList[index]

  // 获取顺序播放的索引
  function getSequencePrevIndex() {
    let prevIndex = currentIndex(playList, currentSong) - 1
    if (prevIndex < 0) {
      prevIndex = playList.length - 1
    }
    return prevIndex
  }

  // 获取单曲循环的索引
  function getLoopPrevIndex() {
    return currentIndex(playList, currentSong)
  }

  // 获取随机播放的索引
  function getRandomPrevIndex() {
    const index = currentIndex(playList, currentSong)
    return getRandomIndex(playList, index)
  }
}

/**
 * @description: 获取随机下标
 * @param {*} playlist
 * @param {*} currentIndex
 * @return {*}
 */
function getRandomIndex(playlist, currentIndex) {
  // 防止无限循环
  if (playlist.length === 1) {
    return currentIndex
  }
  let index = Math.round(Math.random() * (playlist.length - 1))
  if (index === currentIndex) {
    index = getRandomIndex(playlist, currentIndex)
  }
  return index
}