import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import BScroll from '@better-scroll/core'
import Scrollbar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import './index.scss'

BScroll.use(Scrollbar)
BScroll.use(MouseWheel)

const Scroll = forwardRef((props, ref) => {
  const { direction, onScroll, refresh, className } = props

  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()

  const cls = classnames(
    {
      'scroll-wrap': true
    },
    className
  )

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      direction,
      scrollY: true,
      probeType: 3,
      mouseWheel: true,
      scrollbar: true
    })
    setBScroll(scroll)

    return () => {
      setBScroll(null)
    }
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', scroll => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // 通过父组件可以直接使用 ref 访问 refresh 和 getBscroll
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  return (
    <div className={cls} ref={scrollContainerRef}>
      {props.children}
    </div>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  refresh: true,
  onScroll: null
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  className: PropTypes.string
}

export default Scroll