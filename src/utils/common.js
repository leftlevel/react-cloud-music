export { debounce, throttle } from 'lodash'

/**
 * @description: 判断是否为空或未定义
 * @param {*} v
 * @return {*}
 */
export function isDef(v) {
  return v !== undefined && v !== null
}

/**
 * @description: 格式化数字为万单位的字符串
 * @param {*} number
 * @return {*}
 */
export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

/**
 * @description: 个位数前面补零
 * @param {*} num
 * @param {*} n
 * @return {string}
 */
export function pad(num, n = 2) {
  let len = num.toString().length

  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}