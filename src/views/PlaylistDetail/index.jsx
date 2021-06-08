import React, { memo, useState, useEffect, useMemo, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import Header from './components/Header'
import SongTable from 'components/SongTable'
import Tabs from 'components/Tabs'
import Comments from 'components/Comments'
import { createSong } from 'utils'
import { getListDetail, getSongDetail } from 'api/song'
import './index.scss'

const TABS = ['歌曲列表', '评论']
const MAX = 500

function PlaylistDetail(props) {
  const { match: { params: { id } } } = props

  const [playlist, setPlaylist] = useState({})
  const [songs, setSongs] = useState([])
  const [tabs, setTabs] = useState(TABS)
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = index => {
    setTabIndex(index)
  }

  const _getListDetail = async () => {
    const { playlist } = await getListDetail({ id })
    setPlaylist(playlist)
    genSonglist(playlist)
  }

  // 通过歌单生成歌曲列表
  const genSonglist = async playlist => {
    const trackIds = playlist.trackIds.map(({ id }) => id)
    const songDetails = await getSongDetail(trackIds.slice(0, MAX))
    const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) => {
      return createSong({
        id,
        name,
        artists: ar,
        duration: dt,
        mvId: mv,
        albumId: al.id,
        albumName: al.name,
        img: al.picUrl
      })
    })
    setSongs(songs)
  }

  const handleUpdate = (total, isWillUnmount) => {
    if (!isWillUnmount) {
      const copy = tabs.slice()
      copy.splice(1, 1, `评论(共${total}条)`)
      setTabs(copy)
    } else {
      const copy = tabs.slice()
      copy.splice(1, 1, `评论`)
      setTabs(copy)
    }
  }

  useEffect(() => {
    _getListDetail()
  }, [id])

  if (playlist.id) {
    return (
      <div className='playlist-detail'>
        <Header playlist={playlist} songs={songs} />
        <div className='tabs-wrap'>
          <Tabs tabs={tabs} tabChange={handleTabChange} type={'theme'} />
        </div>
        {
          tabIndex === 0 ? (
            <SongTable songs={songs} showHeader={true} />
          ) : (
            <div className='comments'>
              <Comments id={id} type={'playlist'} update={handleUpdate} />
            </div>
          )
        }
      </div>
    )
  } else {
    return null
  }
}

export default memo(withRouter(PlaylistDetail))