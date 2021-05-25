import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import Icon from 'components/Icon'
import './index.scss'

function History(props) {
  const { history } = props

  const goBack = () => {
    history.goBack()
  }

  const goForward = () => {
    history.goForward()
  }

  return (
    <div className='history-wrapper'>
      <Icon backdrop={true} type={'back'} click={goBack}/>
      <Icon backdrop={true} type={'forward'} click={goForward} />
    </div>
  )
}

export default withRouter(memo(History))