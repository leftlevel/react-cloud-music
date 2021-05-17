import { throttle } from './common'

export const remBase = 14

/**
 * @description: 计算字体大小
 * @param {*}
 * @return {*}
 */
export function calcFontSize() {
  const calc = () => {
    const maxFontSize = 18
    const minFontSize = 14
    const html = document.getElementsByTagName('html')[0]
    const width = html.clientWidth
    let size = remBase * (width / 1440)
    size = Math.min(maxFontSize, size)
    size = Math.max(minFontSize, size)
    html.style.fontSize = size + 'px'
  }
  calc()
  // 添加节流函数控制字体大小调整
  window.addEventListener('resize', throttle(calc, 500))
}

/**
 * @description: 将 px 单位转为 rem 单位
 * @param {*} px
 * @return {*}
 */
export function toRem(px) {
  return `${px / remBase}rem`
}