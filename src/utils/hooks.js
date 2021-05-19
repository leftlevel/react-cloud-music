import { useRef, useEffect } from 'react'

function useDebounce(fn, delay = 500) {
  const ref = useRef({
    fn,
    timer: null
  })

  useEffect(() => {
    // 更新引用
    ref.current.fn = fn
  }, [fn])

  function debounce(...args) {
    if (ref.current.timer) {
      clearTimeout(ref.current.timer)
    }
    ref.current.timer = setTimeout(() => {
      ref.current.fn.call(this, ...args)
    }, delay)
  }

  return debounce
}

export default useDebounce