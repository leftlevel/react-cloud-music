import React, { memo, useEffect, useState, useCallback } from 'react'
import { Pagination } from 'antd'
import TopPlaylistCard from 'components/TopPlaylistCard'
import PlaylistCard from 'components/PlaylistCard'
import Tabs from 'components/Tabs'
import { getTopPlaylists, getPlaylists } from 'api/playlist'
import { getPageOffset, formatNumber, unique } from 'utils'
import './index.scss'

const TABS = [
  '全部', '欧美', '华语', '日语', '粤语',
  '流行', '说唱', '摇滚', '民谣', '电子',
  '轻音乐', '影视原声', 'ACG', '怀旧', '治愈',
  '旅行'
]

const PAGE_SIZE = 50

let header = document.getElementsByClassName('header')
let tabWrapper = document.getElementsByClassName('tab-wrapper')
let layoutContent = document.getElementsByClassName('layout-content')

function Playlists() {
  const [topPlaylist, setTopPlaylist] = useState({})      // 精品歌单数据
  const [songPlaylists, setSongPlaylists] = useState([])  // 歌单列表数据
  const [songTotal, setSongTotal] = useState(0)           // 歌单总数
  const [currentIndex, setCurrentIndex] = useState(0)     // tab 高亮的下标
  const [pageIndex, setPageIndex] = useState(1)           // 当前页数

  // 获取顶部精品歌单数据，默认分类为“全部”
  const getTopPlayData = async () => {
    const { playlists } = await getTopPlaylists({ limit: 1, cat: TABS[currentIndex] })
    setTopPlaylist(playlists[0] || {})
  }

  // 获取歌单列表数据
  const getPlaylistsData = async () => {
    const { total, playlists} = await getPlaylists({ 
      limit: PAGE_SIZE,
      cat: TABS[currentIndex],
      offset: getPageOffset(pageIndex, PAGE_SIZE)
    })
    setSongPlaylists(unique(playlists))
    if (total) {
      setSongTotal(total)
    }
  }

  // 标签回调
  const handleTabChange = useCallback(index => {
    setCurrentIndex(index)
    layoutContent[0].scrollTop = 0
  }, [])

  // 分页改变回调
  const handlePaginationChange = useCallback(page => {
    setPageIndex(page)
    let headerHeight = header[0].clientHeight
    let tabWrapperTop =  tabWrapper[0].offsetTop - headerHeight
    layoutContent[0].scrollTop = tabWrapperTop
  }, [])

  useEffect(() => {
    getTopPlayData()
    // eslint-disable-next-line
  }, [currentIndex])

  useEffect(() => {
    getPlaylistsData()
    // eslint-disable-next-line
  }, [currentIndex, pageIndex])

  return (
    <div className='playlist-wrapper'>
      <div className='top-play-list-card'>
        {
          topPlaylist.id && <TopPlaylistCard {...topPlaylist} />
        }
        <Tabs tabs={TABS} type={'small'} align={'left'} tabChange={handleTabChange} />
        <div className='playlist-cards'>
          {
            songPlaylists.length && songPlaylists.map(list => {
              return (
                <PlaylistCard
                  id={list.id}
                  name={list.name}
                  picUrl={list.coverImgUrl}
                  copywriter={`播放量：${formatNumber(list.playCount)}`}
                  key={list.id}
                />
              )
            })
          }
        </div>
        {
          songTotal > 0 && (
            <div className='pagination-wrap'>
              <Pagination
                size='small'
                total={songTotal}
                pageSize={PAGE_SIZE}
                current={pageIndex}
                showSizeChanger={false}
                onChange={handlePaginationChange}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default memo(Playlists)