import { _range } from '@src/utils/functions'

export const mockList = _range(0, 7).map((el, idx) => {
  const isWaitingLog = [2, 3].includes(idx)
  const status = (idx: number) => {
    if (idx === 0) return 'failure'
    if (isWaitingLog) return 'wait'
    return 'success'
  }
  return {
    id: `log-${idx}`,
    createAt: `2020-01-21 16:3${String(7 - idx)}`,
    scheduledAt: isWaitingLog ? '2020-05-21 00:00' : '2020-01-21 16:34',
    startAt: isWaitingLog ? '' : '2020-01-21 16:34',
    updateAt: isWaitingLog ? '' : '2020-01-21 16:34',
    filename: 'works_master_202003310015.zip',
    status: status(idx),
    detail: !isWaitingLog && idx !== 0 ? '追加：1項目 / 削除：5項目' : ''
  }
})
