import storage from 'good-storage'

export function setStorage(key, val) {
  storage.set(key, val)
}

export function getStorage(key) {
  storage.get(key)
}