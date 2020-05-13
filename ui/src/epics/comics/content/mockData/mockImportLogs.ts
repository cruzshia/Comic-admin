import { _range } from '@src/utils/functions'

export default _range(0, 7).map(val => ({
  id: `content-log-${val}`,
  createAt: `2020-01-21 16:3${val}`,
  scheduledAt: `2020-01-21 16:3${val}`,
  startAt: `2020-01-21 16:3${val}`,
  updateAt: `2020-01-21 16:3${val}`,
  filename: `works_master_20200331001${val}.zip`,
  status: ['failure', 'success', 'wait'][val % 3],
  detail: new RegExp('[2-3]').test(val) ? '' : '追加：1項目 / 削除：5項目'
}))
