import React, { memo, useMemo, forwardRef, useCallback } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { toRem } from 'utils/rem'
import './index.scss'

const Icon = forwardRef((props, ref) => {
  const { type, className, size, backdrop, color, click, mouseEnter, mouseOut } = props

  const cls = classnames(
    {
      iconfont: true,
      [`icon-${type}`]: true,
      [`icon-color-${color}`]: color ? true : false
    },
    className
  )

  const getIconStyle = useMemo(() => {
    const chromeMinSize = 12
    const retStyle = { fontSize: toRem(size) }
    if (size < chromeMinSize) {
      const ratio = size / chromeMinSize
      // const 只允许指针不改变，而改变对象属性并不会引起指针改变
      retStyle.transform = `scale(${ratio})`
    }
    return retStyle
  }, [size])

  const handleClick = useCallback(e => {
    click && click(e)
  }, [click])

  const handleMouseEnter = useCallback(() => {
    mouseEnter && mouseEnter()
  }, [mouseEnter])

  const handleMouseOut = useCallback(() => {
    mouseOut && mouseOut()
  }, [mouseOut])

  const MyIcon = (
    <i
      className={cls}
      style={getIconStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
    </i>
  )

  if (backdrop) {
    const backdropSizeRatio = 1.56
    const backdropSize = toRem(backdropSizeRatio * size)
    return (
      <span style={{ width: backdropSize, height: backdropSize }} className='backdrop'>
        {MyIcon}
      </span>
    )
  }

  return MyIcon
})

Icon.defaultProps = {
  size: 16,
  backdrop: false,
  type: '',
  color: ''
}

Icon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  backdrop: PropTypes.bool,
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  click: PropTypes.func,
  mouseEnter: PropTypes.func,
  mouseOut: PropTypes.func
}

export default memo(Icon)