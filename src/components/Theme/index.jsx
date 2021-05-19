import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import Icon from 'components/Icon'
import { Popover } from 'antd'
import variables from 'style/themes/variables'
import variablesWhite from 'style/themes/variables-white'
import variablesRed from 'style/themes/variables-red'
import { setStorage, getStorage, THEME_KEY } from 'utils'
import './index.scss'

const themesObj = {
  white: 'white',
  dark: 'dark',
  red: 'red'
}

const themeMap = {
  [themesObj.dark]: {
    color: themesObj.dark,
    title: '深色',
    file: variables,
    style: {
      backgroundColor: '#202020'
    }
  },
  [themesObj.white]: {
    color: themesObj.white,
    title: '浅色',
    file: variablesWhite,
    style: {
      backgroundColor: '#F6F6F6',
      border: '1px solid #EBEAEA'
    }
  },
  [themesObj.red]: {
    color: themesObj.red,
    title: '红色',
    file: variablesRed,
    style: {
      backgroundColor: '#D33A31'
    }
  }
}

function Theme() {
  const popEl = useRef(null)
  const [themes] = useState(themeMap)
  const [visible, setVisible] = useState(false)
  const changeTheme = themeKey => {
    setStorage(THEME_KEY, themeKey)
    const theme = themes[themeKey].file

    Object.keys(theme).forEach(key => {
      const value = theme[key]
      // 设置全局 css 变量
      document.documentElement.style.setProperty(key, value)
    })
  }

  const content = (
    <div className='theme-content' ref={popEl}>
      {
        Object.values(themes).map((theme, index) => {
          return (
            <div
              className='theme-item'
              key={index}
              onClick={() => changeTheme(themesObj[theme.color])}
            >
              <div className='theme-icon' style={theme.style}></div>
              <p className='theme-title'>{theme.title}</p>
            </div>
          )
        })
      }
    </div>
  )

  const handleClick = useCallback((e) => {
    setVisible(!visible)
  }, [visible])

  const hidePop = useCallback(event => {
    if (visible && popEl.current && !popEl.current.contains(event.target)) {
      setVisible(false)
    }
  }, [visible])

  useEffect(() => {
    const theme = getStorage(THEME_KEY) ? getStorage(THEME_KEY) : themesObj.white
    console.log(theme);
    changeTheme(theme)
  }, [])

  useEffect(() => {
    document.addEventListener('click', hidePop)
    return () => {
      document.removeEventListener('click', hidePop)
    }
  }, [hidePop])

  return (
    <div className='theme-wrapper'>
      <Popover placement='bottomRight' content={content} visible={visible}>
        <Icon type={'skin'} backdrop={true} click={handleClick}/>
      </Popover>
    </div>
  )
}

export default memo(Theme)