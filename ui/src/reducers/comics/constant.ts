export enum AdCategory {
  Opening = 'opening',
  Content = 'contents'
}

export enum AdType {
  Original = 'original',
  Map = 'map',
  Admob = 'admob'
}

export const defaultContentAd = [
  { adCategory: AdType.Admob },
  { adCategory: AdType.Map },
  { adCategory: AdType.Original }
]
export const defaultOpeningAd = [{ adCategory: AdType.Original }]
