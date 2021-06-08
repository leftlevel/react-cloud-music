import React, { memo, useState, useEffect, useMemo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import Comment from '../Comment'
import { scrollInto, getPageOffset } from 'utils'
import { getSongComment, getPlaylistComment, getHotComment, getMvComment } from 'api/comment'
import './index.scss'

const SONG_TYPE = 'song'
const PLAYLIST_TYPE = 'playlist'
const MV_TYPE = 'mv'
const PAGE_SIZE = '20'

function Comments(props) {
  const { id, type, update } = props
  
  const [currentPage, setCurrentPage] = useState(1)
  const [hotComments, setHotComments] = useState([])
  const [comments, setComments] = useState([])
  const [total, setTotal] = useState(0)
  const commentsRef = useRef(null)

  const getComment = async () => {
    const commentRequestMap = {
      [PLAYLIST_TYPE]: getPlaylistComment,
      [SONG_TYPE]: getSongComment,
      [MV_TYPE]: getMvComment
    }

    const commentRequest = commentRequestMap[type]
    const { hotComments = [], comments = [], total } = await commentRequest({
      id,
      limit: PAGE_SIZE,
      offset: getPageOffset(currentPage, PAGE_SIZE)
    })
    
    if (type === PLAYLIST_TYPE && currentPage === 1) {
      const { hotComments: exacHotComments = [] } = await getHotComment({
        id,
        type: 2
      })
      setHotComments(exacHotComments)
    } else {
      setHotComments(hotComments)
    }
    setComments(comments)
    setTotal(total)

    if (update) {
      update(total, false)
    }
  }

  const handlePaginationChange = page => {
    setCurrentPage(page)
    setTimeout(() => {
      scrollInto(commentsRef.current)
    }, 20);
  }

  const shouldHotCommentShow = useMemo(() => {
    return hotComments.length > 0 && currentPage === 1
  }, [hotComments, currentPage])

  const shouldCommentShow = useMemo(() => {
    return comments.length > 0
  }, [comments])

  useEffect(() => {
    getComment()
    return () => {
      if (update) {
        update(total, true)
      }
    }
  }, [id, currentPage])

  return (
    <div className='comments-wrap'>
      {
        shouldHotCommentShow ? (
          <div className='block'>
            <p className='title'>精彩评论</p>
            {
              hotComments.map(comment => {
                return <Comment key={comment.commentId} comment={comment} />
              })
            }
          </div>
        ) : null
      }
      {
        shouldCommentShow ? (
          <div className='block'>
            <p className='title' ref={commentsRef}>
              最新评论
              <span className='count'>({total})</span>
            </p>
            {
              comments.map(comment => {
                return <Comment key={comment.commentId} comment={comment} />
              })
            }
          </div>
        ) : null
      }
      {
        total > PAGE_SIZE ? (
          <div className='pagination-wrap'>
            <Pagination
              size={'small'}
              total={total}
              pageSize={PAGE_SIZE}
              current={currentPage}
              onChange={handlePaginationChange}
              showSizeChanger={false}
            />
          </div>
        ) : null
      }
      {!shouldCommentShow && !shouldHotCommentShow ? <div className='empty'>还没有评论哦</div> : null }
    </div>
  )
}

Comments.defaultProps = {
  type: SONG_TYPE
}

Comments.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  update: PropTypes.func
}

export default memo(Comments)