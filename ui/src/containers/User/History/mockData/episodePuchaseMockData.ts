import { _range } from '@src/utils/functions'

const coinDetails = [
  '購入コイン： -100',
  'ボーナスコイン数： -100',
  '広告コイン数： -100',
  `動画広告コイン数： -40	
ボーナスコイン数： -30
広告コイン数： -30`,
  '動画広告コイン数： -100'
]

export const mockEpisodePurchaseList = _range(0, 5).map(num => ({
  id: num,
  createdAt: `2020-01-21 16:3${num}`,
  contents: `WORK_SHUNKAN1000000${num}`,
  applicationId: '少年ジャンプ+ for iOS',
  coinChangeTotal: '-100',
  coinChangeDetail: coinDetails[num]
}))
