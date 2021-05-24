import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicAction from 'store/music/action'
import Title from 'components/Title'
import SongCard from 'components/SongCard'
import { getNewSongs } from 'api/discovery'
import { createSong } from 'utils'
import './index.scss'

const songsLimit = 10

function NewSongs(props) {
  const { musicAction: { startSong, setPlayList } } = props

  const [list, setList] = useState([])
  const [chunkLimit] = useState(songsLimit / 2)

  // 获取最新音乐数据
  const getList = async () => {
    const { result } = await getNewSongs()
    setList(result)
  }

  // 组织最新音乐外层循环数组
  const thunkedList = useMemo(() => {
    // 返回格式: [[前五条数据], [后五条数据]]
    return [list.slice(0, chunkLimit), list.slice(chunkLimit, list.length)]
  }, [chunkLimit, list])

  // 前面排序数值
  const getSongOrder = useCallback((thunkedIndex, index) => {
    return thunkedIndex = thunkedIndex * chunkLimit + index + 1
  }, [chunkLimit])

  // 组织歌曲数据格式
  const normalizeSong = song => {
    const {
      id,
      name,
      song: {
        mvid,
        artists,
        album: { blurPicUrl },
        duration
      }
    } = song

    return createSong({
      id,
      name,
      img: blurPicUrl,
      artists,
      duration,
      mvid
    })
  }

  // 组织歌单列表
  const normalizedSongs = useMemo(() => {
    return list.map(song => normalizeSong(song))
  }, [list])

  // 点击最新音乐回调
  const handleClick = (thunkedIndex, index) => {
    const normalizedSongIndex = getSongOrder(thunkedIndex, index) - 1
    const song = normalizedSongs[normalizedSongIndex]

    startSong(song)
    setPlayList(normalizedSongs)
  }

  useEffect(() => {
    getList()
  }, [])

  if (list.length) {
    return (
      <div className='new-songs'>
        <Title name='最新音乐' />
        <div className='list-wrap'>
          {
            thunkedList.map((thunked, thunkedIndex) => {
              return (
                <div className='list' key={thunkedIndex}>
                  {
                    thunked.map((item, index) => {
                      return (
                        <div key={item.id} onClick={() => handleClick(thunkedIndex, index)}>
                          <SongCard {...normalizeSong(item)} order={getSongOrder(thunkedIndex, index)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return null
  }
}

const mapDispatchToProps = dispatch => ({ musicAction: bindActionCreators(musicAction, dispatch) })

export default connect(null, mapDispatchToProps)(memo(NewSongs))