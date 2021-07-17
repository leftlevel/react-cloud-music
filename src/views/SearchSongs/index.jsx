import React, { memo, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicAction from 'store/music/action'
import SongTable from 'components/SongTable'
import { getSearch } from 'api/search'
import { getPageOffset, createSong } from 'utils'
import '../../style/pagination.scss'
import './index.scss'

const PAGE_SIZE = 30

function SearchSongs(props) {
  const {
    match: { params: keywords },
    musicAction: { updateCount }
  } = props

  const [songs, setSongs] = useState([])
  const [count, setCount] = useState(0)
  const [pageIndex, setPageIndex] = useState(1)

  const getSearchData = async () => {
    try {
      const { result: { songs, songCount } } = await getSearch({
        limit: 30,
        offset: getPageOffset(pageIndex, PAGE_SIZE),
        ...keywords
      })
  
      const normalizeSongs = songs.map(song => {
        const { id, mvid, name, alias, artists, duration, album } = song
        return createSong({
          id,
          name,
          alias,
          artists,
          duration,
          mvId: mvid,
          albumName: album.name,
          albumId: album.id
        })
      })
  
      setSongs(normalizeSongs)
      updateCount(songCount)
      setCount(songCount)
    
    } catch (error) {
      // 若没有搜索到到单曲
      setSongs([])
      updateCount(0)
      setCount(0)
    }
  }

  const handlePaginationChange = page => {
    setPageIndex(page)
  }

  useEffect(() => {
    getSearchData()
  }, [keywords, pageIndex])

  return (
    <div className='search-song'>
      <SongTable showHeader={true} songs={songs} stripe={false} />
      {
        count ? (
          <div className='pagination-wrap'>
            <Pagination
              size={'small'}
              total={count}
              pageSize={PAGE_SIZE}
              current={pageIndex}
              onChange={handlePaginationChange}
              showSizeChanger={false}
            />
          </div>
        ) : (
          <div className='msg-wrap'>
            搜索结果不存在
          </div>
        )
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({ musicAction: bindActionCreators(musicAction, dispatch) })

export default connect(null, mapDispatchToProps)(memo(SearchSongs))