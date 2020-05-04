export const mockLog = {
  createAt: '2020-01-21 16:34',
  scheduledAt: '2020-01-21 16:34',
  startAt: '2020-01-21 16:34',
  updateAt: '2020-01-21 16:34',
  filename: 'works_master_202003310015.zip',
  status: 'success',
  detail: '追加：1項目 / 削除：5項目'
}

export const mockLogList = new Array(7).fill(mockLog).map((log, idx) => ({
  ...log,
  id: `log-${idx}`,
  createAt: `2020-01-21 16:3${7 - idx}`,
  updateAt: `2020-01-21 16:3${7 - idx}`,
  ...(idx === 0
    ? {
        status: 'failure',
        detail: '非同期処理情報の取得に失敗しました'
      }
    : {}),
  ...(idx === 2 || idx === 3 ? { scheduledAt: '', startAt: '' } : {})
}))
