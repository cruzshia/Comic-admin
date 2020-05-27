import { AdType } from '@src/models/comics/advertisement'

export const defaultFrontAds = [{ adCategory: AdType.Original }]
export const defaultBackAds = [
  { adCategory: AdType.Fan },
  { adCategory: AdType.Map },
  { adCategory: AdType.Original },
  {}
]

export const defaultAdTypes = {
  device: '',
  front: defaultFrontAds,
  back: defaultBackAds
}
