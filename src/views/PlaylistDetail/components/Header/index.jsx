import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicAction from 'store/music/action'
import Icon from 'components/Icon'
import { formatDate } from 'utils'
import './index.scss'

function Header(props) {
  const { playlist, songs, musicAction: { startSong, setPlayList } } = props

  const tagsText = useCallback((tags) => {
    return tags.join('/')
  }, [])

  const handlePlaySongs = () => {
    startSong(songs[0])
    setPlayList(songs)
  }

  return (
    <div className='playlistdetail-header'>
      <div className='img-wrap'>
        <img src={playlist.coverImgUrl} alt="" />
      </div>
      <div className='content'>
        <div className='title-wrap'>
          <p className='title'>{playlist.name}</p>
        </div>
        <div className='creator-wrap'>
          <img className='avatar' src={playlist.creator.avatarUrl} alt="" />
          <p className='creator'>{playlist.creator.nickname}</p>
          <p className='create-time'>{formatDate(playlist.createTime, 'yyyy-MM-dd')} 创建</p>
        </div>
        <div className='action-wrap'>
          <div className='button' onClick={handlePlaySongs}>
            <Icon className='middle' color={'white'} type={'play-round'} />
            <span className='middle'>播放全部</span>
          </div>
        </div>
        <div className='desc-wrap'>
          {
            playlist.tags.length ? (
              <p className='desc'>
                <span>标签：{tagsText(playlist.tags)}</span>
              </p>
            ) : null
          }
          {
            playlist.description ? (
              <p className='desc'>
                <span className='value' title={playlist.description}>简介：{playlist.description}</span>
              </p>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

Header.defaultProps = {
  playlist: {},
  songs: []
}

Header.propTypes = {
  playlist: PropTypes.object,
  songs: PropTypes.array
}

const mapDispatchToProps = dispatch => ({ musicAction: bindActionCreators(musicAction, dispatch) })

export default connect(null, mapDispatchToProps)(React.memo(Header))