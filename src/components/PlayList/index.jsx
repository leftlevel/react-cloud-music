import React, { useState, useEffect, useMemo, memo, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CSSTransition } from 'react-transition-group'
import * as musicAction from 'store/music/action'
import Tabs from 'components/Tabs'
import Icon from 'components/Icon'
import SongTable from 'components/SongTable'
import './index.scss'

const TABS = ['播放列表', '历史记录']

function PlayList(props) {
  const {
    isPlayListShow,
    playList,
    playHistory,
    musicAction: { clearPlayList, clearPlayHistory, setPlayListShow }
  } = props

  const [tabIndex, setTabIndex] = useState(0)
  const playListRef = useRef(null)

  const handleClear = () => {
    if (tabIndex === 0) clearPlayList()
    else clearPlayHistory()
  }

  const handleTabChange = index => {
    setTabIndex(index)
  }

  // 点击弹窗外部进行隐藏
  const hidePlayList = useCallback(e => {
    // console.log(playListRef.current, e.target)
    if (isPlayListShow && playListRef.current && !playListRef.current.contains(e.target)) {
      setPlayListShow(false)
    }
  }, [isPlayListShow])

  const dataSource = useMemo(() => {
    return tabIndex === 0 ? playList : playHistory
  }, [playList, playHistory, tabIndex])

  useEffect(() => {
    document.addEventListener('click', hidePlayList)
    return () => {
      document.removeEventListener('click', hidePlayList)
    }
  }, [hidePlayList])

  return isPlayListShow ? (
    <div className='playlist-wrap' ref={playListRef}>
      <Tabs tabs={TABS} align={'center'} tabChange={handleTabChange} />
      <div className='play-header'>
        <p className='total'>{`总共${dataSource.length}首`}</p>
        {
          dataSource.length ? (
            <div className='remove' onClick={handleClear}>
              <Icon type={'remove'} />
              <span className='text'>清空</span>
            </div>
          ) : null
        }
      </div>
      {
        dataSource.length ? (
          <div className='playlist-table'>
            <SongTable
              showHeader={true}
              songs={dataSource}
              hideColumns={['index', 'img', 'albumName']}
            />
          </div>
        ) : (
          <div className='playlist-tips'>你还没有添加任何歌曲</div>
        )
      }
    </div>
  ) : null
}

const mapStateToProps = state => {
  return {
    isPlayListShow: state.musicReducer.isPlayListShow,
    playList: state.musicReducer.playList,
    playHistory: state.musicReducer.playHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    musicAction: bindActionCreators(musicAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PlayList))