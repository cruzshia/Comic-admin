export const _range = (start: number, end: number) => {
  const stepper = start > end ? -1 : 1
  return new Array(Math.abs(end - start)).fill(start).map((num, idx) => num + idx * stepper)
}

export const objToQueryStr = (params: object) =>
  Object.keys(params || {})
    .map(key => `${key}=${params![key as keyof typeof params]}`)
    .join('&')
export const toDataUri = (src: string | object) => (typeof src === 'string' ? src : URL.createObjectURL(src))
export const toISO8601 = (data: string) => new Date(data).toISOString()

export interface FileWithMeta extends File {
  width?: number
  height?: number
}
export const getImgMeta = ({ image, cbk }: { image: FileWithMeta; cbk: (data: FileWithMeta) => void }) => {
  const img = new Image()
  img.onload = function() {
    image.width = img.width
    image.height = img.height
    cbk(image)
  }
  img.src = toDataUri(image)
}
