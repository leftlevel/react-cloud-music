import React, { memo, useState, useEffect, useRef, forwardRef } from 'react'
import Player from 'xgplayer'

const VideoPlayer = forwardRef((props, ref) => {
  const { url, poster } = props
  const player = useRef(ref)

  const [playerCor, setPlayerCor] = useState(null)

  const initPlayer = () => {
    if (!url) return
    const playerCor = new Player({
      el: player.current,
      // 容器宽度
      width: '100%',
      // 初始化显示视频首帧
      videoInit: true,
      // 播放源
      url,
      // 语言
      lang: 'zh-cn',
      // 初始音量
      volume: 0.8,
      // 封面
      poster: poster,
      // 自动播放
      autoplay: false,
      // 播放倍速
      playbackRate: [0.5, 0.75, 1, 1.5, 2]
    })

    setPlayerCor(playerCor)
  }

  useEffect(() => {
    initPlayer()
    return () => {
      if (playerCor) {
        playerCor.destroy()
        setPlayerCor(null)
      }
    }
  }, [url])

  return (
    <div ref={player}></div>
  )
})

export default memo(VideoPlayer)