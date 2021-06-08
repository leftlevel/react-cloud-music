import React, { memo, useState, useEffect, useMemo, useCallback, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicAction from 'store/music/action'
import { Popover } from 'antd'
import Icon from 'components/Icon'
import ProgressBar from 'components/ProgressBar'
import Volume from 'components/Volume'
import { playModeMap, formatTime, isDef, nextSong, prevSong } from 'utils'
import './index.scss'

function Miniplayer(props) {
  const [visible, setVisible] = useState(false)
  const [songReady, setSongReady] = useState(false)
  const [volume, setVolume] = useState(0.75)
  const audio = useRef()

  const {
    currentSong,
    currentTime,
    playMode,
    isPlayListShow,
    playList,
    isPlayerShow,
    playingState,
    musicAction: {
      setCurrentTime,
      setPlayMode,
      setPlayListShow,
      setPlayerShow,
      startSong,
      setPlayingState
    }
  } = props

  // 当前播放模式
  const currentMode = useMemo(() => {
    return playModeMap[playMode]
  }, [playMode])

  // 模式名称
  const playModeText = useMemo(() => {
    return currentMode.name
  }, [currentMode])

  // 模式图标
  const playModeIcon = useMemo(() => {
    return currentMode.icon
  }, [currentMode])

  // 当前是否有播放歌曲
  const hasCurrentSong = useMemo(() => {
    return isDef(currentSong.id)
  }, [currentSong])

  // 进度条拖动的范围是1-100，需要将 volume * 100 再传递
  const computedVolume = useMemo(() => {
    return volume * 100
  }, [volume])

  // 歌曲进度数值
  const playedPercent = useMemo(() => {
    const { durationSecond } = currentSong
    return Math.min(currentTime / durationSecond, 1) * 100 || 0
  }, [currentTime, currentSong])

  const playIcon = useMemo(() => {
    return playingState ? 'pause' : 'play'
  }, [playingState])

  const handleMouseEvent = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const handleChangePlayMode = useCallback(() => {
    const modeKeys = Object.keys(playModeMap)
    const currentModeIndex = modeKeys.findIndex(key => playModeMap[key].code === playMode)
    const nextIndex = (currentModeIndex + 1) % modeKeys.length
    const nextModeKey = modeKeys[nextIndex]
    const nextMode = playModeMap[nextModeKey]

    setPlayMode(nextMode.code)
  }, [playMode])

  const togglePlayListShow = () => {
    setPlayListShow(!isPlayListShow)
  }

  const togglePlayerShow = () => {
    setPlayerShow(!isPlayerShow)
  }

  // 上一首
  const prev = () => {
    const song = prevSong(playList, playMode, currentSong)
    startSong(song)
  }

  // 下一首
  const next = () => {
    const song = nextSong(playList, playMode, currentSong)
    startSong(song)
  }

  // 准备播放歌曲
  const ready = () => {
    setSongReady(true)
  }

  // 下一首
  const end = () => {
    next()
  }

  // 播放歌曲
  const play = async () => {
    if (songReady) {
      try {
        await audio.current.play()
        setPlayingState(true)
      } catch (error) {
        setPlayingState(false)
      }
    }
  }

  // 暂停
  const pause = () => {
    audio.current.pause()
  }

  // 暂停/播放
  const togglePlaying = () => {
    if (!hasCurrentSong) {
      return
    }
    setPlayingState(!playingState)
  }

  // 更新时长
  const updateTime = e => {
    setCurrentTime(e.target.currentTime)
  }

  // 拖动声音大小进度条
  const onVolumeInput = value => {
    setVolume(value / 100)
    audio.current.volume = value / 100
  }

  // 点击声音大小进度节点
  const onVolumeChange = value => {
    setVolume(value / 100)
    audio.current.volume = value / 100
  }

  const setTime = playedPercent => {
    const { durationSecond } = currentSong
    const time = durationSecond * (playedPercent / 100)
    audio.current.currentTime = time
    setCurrentTime(time)
  }

  // 点击歌曲播放进度节点
  const onProgressChange = value => {
    setTime(value)
  }

  // 拖动歌曲播放进度条
  const onProgressInput = value => {
    setTime(value)
  }

  useEffect(() => {
    if (currentSong && songReady) {
      play()
    }
  }, [currentSong, songReady])

  useEffect(() => {
    playingState ? play() : pause()
  }, [playingState])

  useEffect(() => {
    audio.current.volume = volume
  }, [volume])

  const content = <p className='miniPlayer-pop-content'>{playModeText}</p>

  return (
    <div className='mini-player-wrapper'>
      {/* 歌曲内容 */}
      <div className='song'>
        {
          hasCurrentSong && (
            <Fragment>
              <div className='img-wrap' onClick={togglePlayerShow}>
                <img className='blur' src={currentSong.img} alt="" />
                <div className='player-control'>
                  <Icon size={24} type={isPlayerShow ? 'shrink' : 'open'} color={'white'} />
                </div>
              </div>
              <div className='content'>
                <div className='top'>
                  <p className='name'>{currentSong.name}</p>
                  <p className='split'>-</p>
                  <p className='artists'>{currentSong.artistsText}</p>
                </div>
                <div className='time'>
                  <span className='played-time'>{formatTime(currentTime)}</span>
                  <span className='split'>/</span>
                  <span className='total-time'>{formatTime(currentSong.durationSecond)}</span>
                </div>
              </div>
            </Fragment>
          )
        }
      </div>
      {/* 控制台 */}
      <div className='control'>
        <Icon size={24} className='icon' type={'prev'} click={prev} />
        <div className='play-icon' onClick={togglePlaying}>
          <Icon size={24} type={playIcon} />
        </div>
        <Icon size={24} className='icon' type={'next'} click={next} />
      </div>
      <div className='mode'>
        {/* 模式 */}
        <Popover placement='top' content={content} visible={visible} trigger='hover'>
          <Icon
            size={20}
            className='mode-item'
            type={playModeIcon}
            mouseEnter={handleMouseEvent}
            mouseOut={handleMouseEvent}
            click={handleChangePlayMode}
          />
        </Popover>
        {/* 播放列表 */}
        <Icon size={20} className='mode-item' type='playlist' click={togglePlayListShow} />
        {/* 音量 */}
        <div className='volume-item'>
          <Volume
            volume={computedVolume}
            onVolumeChange={onVolumeChange}
            onVolumeInput={onVolumeInput}
          />
        </div>
      </div>
      {
        hasCurrentSong && (
          <div className='progress-bar-wrap'>
            {/* 进度条 */}
            <ProgressBar
              progressChange={onProgressChange}
              progressInput={onProgressInput}
              percent={playedPercent}
              step={'0.1'}
            />
          </div>
        )
      }
      <audio
        src={currentSong.url}
        ref={audio}
        onCanPlay={ready}
        onEnded={end}
        onTimeUpdate={updateTime}
      ></audio>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentSong: state.musicReducer.currentSong,
    currentTime: state.musicReducer.currentTime,
    playMode: state.musicReducer.playMode,
    isPlayListShow: state.musicReducer.isPlayListShow,
    playList: state.musicReducer.playList,
    isPlayerShow: state.musicReducer.isPlayerShow,
    playingState: state.musicReducer.playingState
  }
}

const mapDispatchToProps = dispatch => ({ musicAction: bindActionCreators(musicAction, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(memo(Miniplayer))
