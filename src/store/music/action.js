import * as music from './action-type'

/**
 * @description: 开始播放歌曲
 * @param {*} rawSong
 * @return {*}
 */
export const startSong = rawSong => {
  // 将 rawSong 拷贝到 {}
  const song = Object.assign({}, rawSong)

  return (dispatch, getState) => {
    const { musicReducer: { playHistory } } = getState()

    const playHistoryCopy = playHistory.slice()

    const findedIndex = playHistoryCopy.findedIndex(({ id }) => cong.id === id)

    if (findedIndex !== -1) {
      // 删除旧的一项，插入到最前面
      playHistoryCopy.splice(findedIndex, 1)
    }
    playHistoryCopy.unshift(song)

    dispatch(setPlayHistory(playHistoryCopy))

    dispatch(setCurrentSong(song))
  }
}

/**
 * @description: 设置当前播放歌曲
 * @param {*} song
 * @return {*}
 */
export const setCurrentSong = song => {
  return {
    type: music.SET_CURRENT_SONG,
    song
  }
}

/**
 * @description: 设置播放模式
 * @param {*} code
 * @return {*}
 */
export const setPlayMode = code => {
  return {
    type: music.SET_PLAY_MODE,
    code
  }
}

/**
 * @description: 设置播放歌单
 * @param {*} songs
 * @return {*}
 */
export const setPlayList = songs => {
  return {
    type: music.SET_PLAY_LIST,
    songs
  }
}

/**
 * @description: 设置播放歌单的展示
 * @param {*} flag
 * @return {*}
 */
export const setPlayListShow = flag => {
  return {
    type: music.SET_PLAY_LIST_SHOW,
    flag
  }
}

/**
 * @description: 清除播放歌单
 * @param {*}
 * @return {*}
 */
export const clearPlayList = () => {
  return dispatch => {
    dispatch(setPlayList([]))
    dispatch(clearCurrentSong())
  }
}

/**
 * @description: 设置播放器的展示
 * @param {*} flag
 * @return {*}
 */
export const setPlayerShow = flag => {
  return {
    type: music.SET_PLAYER_SHOW,
    flag
  }
}

/**
 * @description: 设置当前播放时长
 * @param {*} time
 * @return {*}
 */
export const setCurrentTime = time => {
  return {
    type: music.SET_CURRENT_TIME,
    time
  }
}

/**
 * @description: 设置播放状态
 * @param {*} state
 * @return {*}
 */
export const setPlayingState = state => {
  return {
    type: music.SET_PLAYING_STATE,
    state
  }
}

/**
 * @description: 设置历史记录
 * @param {*} history
 * @return {*}
 */
export const setPlayHistory = history => {
  return {
    type: music.SET_PLAY_HISTORY,
    history
  }
}

/**
 * @description: 清除历史记录
 * @param {*}
 * @return {*}
 */
export const clearPlayHistory = () => {
  return dispatch => {
    dispatch(setPlayHistory([]))
  }
}

/**
 * @description: 清除当前歌曲
 * @param {*}
 * @return {*}
 */
export const clearCurrentSong = () => {
  return dispatch => {
    dispatch(setPlayingState(false))
    dispatch(setCurrentTime(0))
    dispatch(setCurrentSong({}))
  }
}

/**
 * @description: 更新结果数据
 * @param {*} count
 * @return {*}
 */
export const updateCount = count => {
  return {
    type: music.UPDATE_COUNT,
    count
  }
}