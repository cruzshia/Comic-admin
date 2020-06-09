export enum ImageKey {
  Image1 = 'image1',
  Image2 = 'image2',
  Image3 = 'image3',
  Image4 = 'image4'
}

export interface ImageInfo {
  url: string | File
  width: number
  height: number
}

export interface ImageUploadMeta {
  path: string
  width: number
  height: number
}

export default interface Image<T> {
  [ImageKey.Image1]: T
  [ImageKey.Image2]: T
  [ImageKey.Image3]: T
  [ImageKey.Image4]: T
}
