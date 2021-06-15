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

/**
 * @description: 分页偏移
 * @param {*} page
 * @param {*} limit
 * @return {*}
 */
export function getPageOffset(page, limit) {
  return (page - 1) * limit;
}

/**
 * @description: 获取 id 唯一数组
 * @param {*} arr
 * @param {*} key
 * @return {*}
 */
export function unique(arr, key = "id") {
  let uniqueArr = [];
  arr.forEach(item => {
    const result = uniqueArr.findIndex(uniq => uniq[key] === item[key]);

    if (result === -1) {
      uniqueArr.push(item);
    }
  });

  return uniqueArr;
}

/**
 * @description: 日期格式化
 * @param {*} date
 * @param {*} fmt
 * @return {*}
 */
export function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  date = date instanceof Date ? date : new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

/**
 * @description: 时间格式化
 * @param {*} interval
 * @return {*}
 */
export function formatTime(interval) {
  interval = interval | 0;
  const minute = pad((interval / 60) | 0);
  const second = pad(interval % 60);
  return `${minute}:${second}`;
}

/**
 * @description: 滚动条滑动
 * @param {*} dom
 * @return {*}
 */
export function scrollInto(dom) {
  dom.scrollIntoView({ behavior: "smooth" });
}