export const mockLog = {
  createAt: '2020-01-21 16:34:00',
  updateAt: '2020-01-21 16:34:00',
  filename: 'works_master_202003310015.zip',
  status: 'success',
  detail: '追加：1項目 / 削除：5項目'
}

export const mockLogList = new Array(7).fill(mockLog).map((log, idx) => ({
  ...log,
  id: `log-${idx}`,
  createAt: `2020-01-21 16:34:0${7 - idx}`,
  updateAt: `2020-01-21 16:34:0${7 - idx}`,
  ...(idx === 0
    ? {
        status: 'failure',
        detail: '非同期処理情報の取得に失敗しました'
      }
    : {})
}))