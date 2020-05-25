import testIds from '../fixtures/testIds.json'

const isAdvertisement = (_chai, _) => {
  function assertIsAdvertisement(props) {
    const { isOriginal = false } = typeof props === 'object' ? props : {}
    const $inputRow = this._obj.find(`[data-testid=${testIds.inputBlock.row}]`)
    const LABEL_SELECTOR = `[data-testid=${testIds.inputBlock.label}]`
    const SELECT_SELECTOR = `[data-testid=${testIds.inputs.select}]`
    const TEXT_SELECTOR = `[data-testid=${testIds.inputs.text}]`
    const BTN_SELECTOR = `[data-testid=${testIds.button.normal}]`
    const IMG_PREVIEW_SELECTOR = `[data-testid=${testIds.imagePreview}]`

    this.assert(
      $inputRow
        .eq(0)
        .find(LABEL_SELECTOR)
        .text() === '広告の種類' && $inputRow.eq(0).find(SELECT_SELECTOR) !== undefined,
      'expected #{this} 1st input row label should be 広告の種類 and input field should be select',
      'expected #{this} 1st input row label should not be 広告の種類 and input field should not be select'
    )

    if (isOriginal) {
      this.assert(
        $inputRow
          .eq(1)
          .find(LABEL_SELECTOR)
          .text() === '画像URL' &&
          $inputRow.eq(1).find(TEXT_SELECTOR) !== undefined &&
          $inputRow
            .eq(1)
            .find(BTN_SELECTOR)
            .text() === 'プレビュー',
        'expected #{this} 2nd input row label should be 画像URL, input field should be text and button text should be プレビュー',
        'expected #{this} 2nd input row label should not be 画像URL, input field should not be text and button text should not be プレビュー',
        this._obj
      )

      this.assert(
        $inputRow
          .eq(2)
          .find(LABEL_SELECTOR)
          .text() === 'リンクURL' && $inputRow.eq(2).find(TEXT_SELECTOR) !== undefined,
        'expected #{this} 3rd input row label should be リンクURL and input field should be text',
        'expected #{this} 3rd input row label should not be リンクURL and input field should not be text',
        this._obj
      )

      this.assert(
        $inputRow
          .eq(3)
          .find(LABEL_SELECTOR)
          .text() === 'ボタン名称' && $inputRow.eq(3).find(TEXT_SELECTOR) !== undefined,
        'expected #{this} 4th input row label should be ボタン名称 and input field should be text',
        'expected #{this} 4th input row label should not be ボタン名称 and input field should not be text',
        this._obj
      )

      this.assert(
        $inputRow
          .eq(4)
          .find(LABEL_SELECTOR)
          .text() === '配信期間' && $inputRow.eq(4).find(TEXT_SELECTOR) !== undefined,
        'expected #{this} 5th input row label should be 配信期間 and input field should be text',
        'expected #{this} 5th input row label should not be 配信期間 and input field should not be text',
        this._obj
      )

      this.assert(
        this._obj.find(IMG_PREVIEW_SELECTOR) !== undefined,
        'expected #{this} 6th input row label should be image preview',
        'expected #{this} 6th input row label should not be image preview',
        this._obj
      )
    }
  }

  _chai.Assertion.addMethod('advertisement', assertIsAdvertisement)
}
chai.use(isAdvertisement)
