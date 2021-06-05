import React, { memo, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { formatDate } from 'utils'
import { getMvDetails, getMvUrl, getSimiMv, getArtists } from 'api/mv'
import Comments from 'components/Comments'
import MvCard from 'components/MvCard'
import VideoPlayer from 'components/VideoPlayer'
import './index.scss'

function Mv(props) {
  const { match: { params: { id } } } = props

  const [mvDetail, setMvDetail] = useState([])
  const [mvPlayInfo, setMvPlayInfo] = useState('')
  const [artist, setArtist] = useState({})
  const [simiMvs, setSimiMvs] = useState([])

  const init = async () => {
    const [{ data: mvDetail }, { data: mvPlayInfo }, { mvs: simiMvs }] = await Promise.all([
      getMvDetails(id),
      getMvUrl(id),
      getSimiMv(id)
    ])

    const { artist } = await getArtists(mvDetail.artistId)
    setMvDetail(mvDetail)
    setMvPlayInfo(mvPlayInfo)
    setSimiMvs(simiMvs)
    setArtist(artist)
  }

  useEffect(() => {
    init()
  }, [id])

  return (
    <div className='mv-wrap'>
      <div className='mv-content'>
        <div className='left'>
          <p className='title'>mv详情</p>
          <div className='player'>
            <VideoPlayer url={mvPlayInfo.url} poster={mvDetail.cover} />
          </div>
          <div className='author-wrap'>
            <div className='avatar'>
              <img src={artist.picUrl} alt="" />
            </div>
            <p className='author'>{artist.name}</p>
          </div>
          <p className='name'>{mvDetail.name}</p>
          <div className='desc'>
            <span className='date'>发布：{formatDate(mvDetail.publishTime, "yyyy-MM-dd")}</span>
            <span className='count'>播放：{mvDetail.playCount}次</span>
          </div>
          <div className='comments'>
            <Comments id={id} type={'mv'} />
          </div>
        </div>
        <div className='right'>
          <p className='title'>相关推荐</p>
          {
            simiMvs.length ? simiMvs.map(mv => {
              return (
                <div className='simi-mvs' key={mv.id}>
                  <div className='simi-mvs-card'>
                    <div className='card-left'>
                      <MvCard id={mv.id} picUrl={mv.cover} playCount={mv.playCount} />
                    </div>
                    <div className='card-right'>
                      <div className='name' title={mv.name}>{mv.name}</div>
                      <div className='desc' title={mv.artistName}>by {mv.artistName}</div>
                    </div>
                  </div>
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
}

export default memo(withRouter(Mv))