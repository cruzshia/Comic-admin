export const _range = (start: number, end: number) => {
  const stepper = start > end ? -1 : 1
  return new Array(Math.abs(end - start)).fill(start).map((num, idx) => num + idx * stepper)
}

export const toDataUri = (src: string | object) => (typeof src === 'string' ? src : URL.createObjectURL(src))
