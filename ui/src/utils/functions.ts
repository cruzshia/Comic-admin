import dayjs from 'dayjs'

export const _range = (start: number, end: number) => {
  const stepper = start > end ? -1 : 1
  return new Array(Math.abs(end - start)).fill(start).map((num, idx) => num + idx * stepper)
}

export const objToQueryStr = (params: object) =>
  Object.keys(params || {})
    .map(key => `${key}=${params![key as keyof typeof params]}`)
    .join('&')
export const toDataUri = (src: string | object) => (typeof src === 'string' ? src : URL.createObjectURL(src))
export const toISO8601 = (data: string) => dayjs(data).format('YYYY-MM-DDTHH:mm:ss[Z]')
export const toDateTime = (data: string) => dayjs(data).format('YYYY-MM-DD hh:mm')

export function batchConvertDate<T>(values: { [key: string]: any }, keys: string[]): T | any {
  const convertedParams = { ...values }
  keys.forEach(dateKey => {
    if (!!convertedParams[dateKey]) {
      convertedParams[dateKey] = toISO8601(convertedParams[dateKey])
    }
  })
  return convertedParams as T
}

export function batchConvertISO8601<T>(values: { [key: string]: any }, keys: string[]): T | any {
  const convertedParams = { ...values }
  keys.forEach(dateKey => {
    if (!!convertedParams[dateKey]) {
      convertedParams[dateKey] = toDateTime(convertedParams[dateKey])
    }
  })
  return convertedParams as T
}

export const getImgMeta = ({ image, cbk }: { image: File; cbk: (data: any) => void }) => {
  const img = new Image()
  img.onload = function() {
    cbk({
      url: image,
      width: img.width,
      height: img.height
    })
  }
  img.src = toDataUri(image)
}

export function _uuid() {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
