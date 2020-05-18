import { _range } from '@src/utils/functions'

export const mockQuestionnaire = {
  id: 'WORK_SHUNKAN10000006',
  name: '週刊少年ジャンプ 2020年14号',
  deliverStart: '2019-12-25 00:00',
  deliverEnd: '2019-12-25 00:00',
  category: 'アンケート',
  content: 'サンプル',
  contentName: 'サンプル',
  answerReward: 100,
  externalUrl: 'https://webview.shonenjump.com/top/survey/wj/2012/header.jpg',
  bannerUrl: 'https://webview.shonenjump.com/top/survey/wj/2012/header.jpg',
  descriptionTitle: 'アンケートの注意点',
  description: `※回答は一人一回のみとなります。
※週刊少年ジャンプ本誌の愛読者アンケートとは内容が異なりますのでご注意ください。
※投票結果は少年ジャンプ本誌、ならびに少年ジャンプ＋の運営の参考にさせていただきます。
※当選者の発表はメールで当選者にご連絡させていただきます。
※回答期間：2020/03/02 01:00～2020/03/09 00:59まで`,
  footer: `※本企画は集英社が主催しており、Apple Inc.の提供・協賛によるものではありません。
※ご入力いただいたメールアドレスは、当選者への連絡のために利用し、それ以外には利用いたしません。
※賞品の発送は日本国内に限らせていただきます。`,
  answerCompletedMessage: `アンケートへの回答ありがとうございました。
※投票結果は少年ジャンプ本誌、ならびに少年ジャンプ＋の運営の参考にさせていただきます。
※当選者の発表はメールで当選者にご連絡させていただきます。
※商品の当選者は、全応募者の中から編集部による厳正な抽選によって決定します。`,
  response: '2件',
  createAt: '2019-12-25 00:00',
  answerStartTime: '2019-12-25 00:00',
  answerEndTime: '2019-12-25 00:00',
  questions: [
    {
      content: '週刊少年ジャンプ 2020年14号の中で面白かったもの3つを、面白かった順に選択ください',
      required: '必須',
      type: 'multipleDropdown',
      line: `•1番目に面白かったもの
•2番目に面白かったもの
•3番目に面白かったもの`,
      option: `•『Dr.STONE』
•『鬼滅の刃』
•『しろすぎ！アクノソシキ』
•『僕のヒーローアカデミア』
•『ミタマセキュ霊ティ』
•『約束のネバーランド』
•『呪術廻戦』
•『マッシュル-MASHLE-』
•『チェンソーマン』
•『アンデッドアンラック』
•『アクタージュ act-age』
•『魔女の守人』
•『ブラッククローバー』
•『ぼくたちは勉強ができない』
•『AGRAVITY BOYS』
•『夜桜さんちの大作戦』
•『ゆらぎ荘の幽奈さん』
•『ZIPMAN!!』
•『サムライ8 八丸伝`,
      shuffle: 'シャッフルしない',
      limitation: 'ちょうど３'
    },
    {
      content: 'デジタル版「週刊少年ジャンプ」で何作品読んでいますか？',
      required: '必須',
      type: 'dropdown',
      option: `•1作品
•2作品
•3作品
•4～5作品
•6～9作品
•10～15作品
•16～21作品
•全部読んでいる`,
      shuffle: 'シャッフルしない'
    },
    {
      content: 'デジタル版を購読するにあたり、紙版の少年ジャンプを買わなくなりましたか？',
      required: '必須',
      type: 'radioButton',
      line: `•紙版を買わなくなった
•もともと紙版を買っていなかった
•買うのをやめていたが電子版で再び買いはじめた
•同じ号を紙版と電子版で両方買っている
•号によって紙版か電子版を使い分けて買っている`,
      shuffle: 'シャッフルしない'
    },
    {
      content: 'その他、ご意見・ご感想あれば入力ください（500文字まで）',
      required: '必須ではない',
      type: 'textBoxMultipleLine',
      inputRange: '文字数 範囲 0 から 500'
    }
  ]
}

export const mockQuestionnaireList = _range(1, 8).map(num => ({
  id: `PLUSENQ_WJ20201${num}`,
  name: '週刊少年ジャンプ 2020年14号',
  deliverStart: `2020-01-21 16:3${num}`,
  deliverEnd: '2020-01-21 16:34',
  answerReward: 100
}))
