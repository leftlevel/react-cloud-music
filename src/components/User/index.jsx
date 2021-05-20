import React, { Fragment, useState, useEffect, memo } from 'react'
import Icon from 'components/Icon'
import { Modal, Button, Input, message, Avatar } from 'antd'
import { connect } from 'react-redux'
import * as userActions from 'store/user/action'
import { bindActionCreators } from 'redux'
import { toRem, getStorage, UID_KEY, isDef } from 'utils'
import './index.scss'

const User = props => {
  const { user: { nickname, avatarUrl } } = props
  const [visible, setVisible] = useState(false)
  const [cfmVisible, setCfmVisible] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const handleOpenModal = () => {
    setVisible(true)
  }
  const handleOpenConfirm = () => {
    setCfmVisible(true)
  }
  const handleLogin = () => {
    if (!inputVal) {
      message.warning('请先填写uid')
      return
    }
    props.userActions.login(inputVal).then(res => {
      console.log(res);
      if (res) {
        setVisible()
      }
    })
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.userInfo,
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = dispatch => ({ userActions: bindActionCreators(userActions, dispatch) })

export default connect(memo(User))
