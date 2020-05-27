import testIds from '../fixtures/testIds.json'

const AdCategory = { Original: 'original', Admob: 'admob', Map: 'map' }

const isAdTable = (_chai, _) => {
  function assertIsAdTable(props) {
    const { adType = AdCategory.Original } = typeof props === 'object' ? props : {}
    const $tableRow = this._obj.find(`[data-testid=${testIds.dataTable.row}]`)

    const LABEL_SELECTOR = `[data-testid=${testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${testIds.dataTable.content}]`

    if (adType === AdCategory.Admob) {
      this.assert(
        this._obj.find(LABEL_SELECTOR).text() === 'Admob (FAN)' &&
          this._obj.find(CONTENT_SELECTOR).text() !== undefined,
        'expected #{this} input row label should be Admob (FAN) and content should empty',
        'expected #{this} input row label should not be Admob (FAN) and content should not empty'
      )
    }

    if (adType === AdCategory.Map) {
      this.assert(
        this._obj.find(LABEL_SELECTOR).text() === 'MAP' && this._obj.find(CONTENT_SELECTOR).text() !== undefined,
        'expected #{this} input row label should be MAP and content should empty',
        'expected #{this} input row label should not be MAP and content should not empty'
      )
    }

    if (adType === AdCategory.Original) {
      this.assert(
        this._obj
          .find(LABEL_SELECTOR)
          .eq(0)
          .text() === 'オリジナル',
        'expected #{this} input row label should be オリジナル',
        'expected #{this} input row label should not be オリジナル'
      )

      this.assert(
        $tableRow
          .eq(0)
          .find(LABEL_SELECTOR)
          .text() === '画像' && $tableRow.find(`${CONTENT_SELECTOR}`).text() !== undefined,
        'expected #{this} 1st input row label should be 画像 and content should empty',
        'expected #{this} 1st input row label should not be 画像 and content should not empty'
      )

      this.assert(
        $tableRow
          .eq(1)
          .find(LABEL_SELECTOR)
          .text() === 'リンクURL' && $tableRow.find(CONTENT_SELECTOR).text() !== undefined,
        'expected #{this} 2st input row label should be リンクURL and content should empty',
        'expected #{this} 2st input row label should not be リンクURL and content should not empty'
      )

      this.assert(
        $tableRow
          .eq(2)
          .find(LABEL_SELECTOR)
          .text() === 'ボタン名称' && $tableRow.find(CONTENT_SELECTOR).text() !== undefined,
        'expected #{this} 3rd input row label should be ボタン名称 and content should empty',
        'expected #{this} 3rd input row label should not be ボタン名称 and content should not empty'
      )

      this.assert(
        $tableRow
          .eq(3)
          .find(LABEL_SELECTOR)
          .text() === '配信期間' && $tableRow.find(CONTENT_SELECTOR).text() !== undefined,
        'expected #{this} 4th input row label should be 配信期間 and content should empty',
        'expected #{this} 4th input row label should not be 配信期間 and content should not empty'
      )
    }
  }

  _chai.Assertion.addMethod('adTable', assertIsAdTable)
}
chai.use(isAdTable)
