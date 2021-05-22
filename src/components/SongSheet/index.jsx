import React, { Fragment, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import './index.scss'

function SongSheet(props) {
  const { userPlaylist } = props

  return (
    <Fragment>
      {
        userPlaylist.map((playlist, index) => {
          return (
            <div className='song-sheet-wrapper' key={index}>
              <p className='song-sheet-title'>{playlist.title}</p>
              <ul>
                {
                  playlist.children.map((child, childIndex) => {
                    return (
                      <li className='song-sheet-item' key={childIndex}>
                        <NavLink exact to={child.path}>
                          <Avatar className='item-avatar' shape='square' src={child.avatar} />
                          <div className='item-name'>
                            <p className='name'>{child.title}</p>
                            <p className='num'>{child.num}首</p>
                          </div>
                        </NavLink>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({ userPlaylist: state.userReducer.userPlaylist })

export default connect(mapStateToProps, null)(memo(SongSheet))