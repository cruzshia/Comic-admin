export const mockComment = {
  id: 'WORK_SHUNKAN10000006',
  userId: 'WORK_SHUNKAN10000006',
  contentId: 'WORK_SHUNKAN10000006',
  appId: 'WORK_SHUNKAN10000006',
  content: '純粋に面白くない。',
  status: 'not_approved',
  likes: 10,
  report: 10,
  createDateTime: '2019-12-25 00:00',
  updateDateTime: '2019-12-25 00:00'
}

const mockCommentUnit = {
  id: 'WORK_SHUNKAN10000006',
  userId: 'fe116c1be932f9a4f488d00489e8a92e',
  contentId: 'WORK_SHUNKAN10000006',
  content: '[1話]いともたやすく行われる十三歳が生きる為のお仕事',
  message: '純粋に面白くない。',
  status: '未承認',
  likes: 100,
  report: 500,
  createDateTime: '2019-12-25 00:00',
  updateDateTime: '2019-12-25 00:00'
}

export const mockCommentList = [
  {
    ...mockCommentUnit,
    message:
      'めちゃくちゃ面白いです。わからない！っていう声ほど届くものです。楽しみに待っているファンはたくさんいます。大丈夫です。この作品が後世に名を残す名作になると思っています。',
    report: 1100
  }
].concat(
  [...new Array(3)].map((_, idx) => ({
    ...mockCommentUnit,
    id: mockCommentUnit.id + idx
  }))
)
