export enum AdCategory {
  Opening = 'opening',
  Content = 'contents'
}

export enum AdType {
  Original = 'original',
  Map = 'map',
  Admob = 'admob'
}

export const defaultFrontAds = [{ adCategory: AdType.Original }]
export const defaultBackAds = [
  { adCategory: AdType.Admob },
  { adCategory: AdType.Map },
  { adCategory: AdType.Original },
  {}
]

export const defaultAdTypes = {
  device: '',
  front: defaultFrontAds,
  back: defaultBackAds
}
