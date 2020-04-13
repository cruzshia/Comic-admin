import { _range } from '@src/utils/functions'

export const mockQuestionnaireList = _range(1, 8).map(num => ({
  id: `PLUSENQ_WJ20201${num}`,
  name: '週刊少年ジャンプ 2020年14号',
  deliverStart: `2020-01-21 16:3${num}`,
  deliverEnd: '2020-01-21 16:34',
  answerReward: 100
}))
