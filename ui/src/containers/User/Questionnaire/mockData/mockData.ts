import { _range } from '@src/utils/functions'

export const mockQuestionnaire = {
  id: 'WORK_SHUNKAN10000006',
  name: '週刊少年ジャンプ 2020年14号',
  deliverStart: '2019-12-25 00:00',
  deliverEnd: '2019-12-25 00:00',
  category: 'アンケート',
  content: 'サンプル',
  answerReward: 100
}

export const mockQuestionnaireList = _range(1, 8).map(num => ({
  id: `PLUSENQ_WJ20201${num}`,
  name: '週刊少年ジャンプ 2020年14号',
  deliverStart: `2020-01-21 16:3${num}`,
  deliverEnd: '2020-01-21 16:34',
  answerReward: 100
}))
