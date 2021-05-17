import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'components/Icon'
import History from 'components/History'
import './index.scss'

function Header(props) {
  const { isPlayerShow } = props

  // const togglePlayerShow = () => {
  //   props.musicAction.setPlayerShow(!isPlayerShow)
  // }

  return (
    <header className='header'>
      <div className='header-left'>
        <div className='header-left__buttons'>
          <div className='mac-button red'>
            <Icon types={'home'} size={9}/>
          </div>
          <div className='mac-button red'>
            <Icon types={'minus'} size={9}/>
          </div>
          <div className='mac-button red'>
            <Icon types={'fullscreen'} size={9}/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header