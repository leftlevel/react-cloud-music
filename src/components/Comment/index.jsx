import React, { memo } from 'react'
import Icon from 'components/Icon'
import { formatDate } from 'utils'
import './index.scss'

function Commnent(props) {
  const { comment } = props

  return (
    <div className='comment-wrap'>
      <div className='avatar'>
        <img src={comment.user.avatarUrl} alt="" />
      </div>
      <div className='content'>
        <p className='comment-text'>
          <span className='username'>{comment.user.nickname}：</span>
          <span className='text'>{comment.content}</span>
        </p>
        {
          comment.beReplied.length && comment.beReplied[0].content ? (
            <div className='replied'>
              <p className='comment-text'>
                <span className='username'>{comment.beReplied[0].user.nickname}：</span>
                <span className='text'>{comment.beReplied[0].content}</span>
              </p>
            </div>
          ) : null
        }
        <div className='bottom'>
          <span className='date'>{formatDate(comment.time)}</span>
          <div className='actions'>
            {comment.likedCount}
            <Icon size={12} type={'good'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Commnent)