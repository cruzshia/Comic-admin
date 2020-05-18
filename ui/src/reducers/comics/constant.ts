export enum AdCategory {
  Opening = 'opening',
  Content = 'contents'
}

export enum AdType {
  Original = 'original',
  Map = 'map',
  Admob = 'admob'
}

export const defaultAdTypes = [
  { adCategory: AdType.Original, type: 'opening' },
  { adCategory: AdType.Admob, type: 'content' },
  { adCategory: AdType.Map, type: 'content' },
  { adCategory: AdType.Original, type: 'content' },
  { type: 'content' }
]
