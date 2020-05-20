const isRightCapsuleColor = (_chai, _) => {
  function assertIsRightCapsuleColor() {
    const capsuleStatus = ['公開中', '公開終了', '予約中']
    const rowColors = ['rgba(0, 0, 0, 0)', 'rgb(237, 237, 237)', 'rgb(248, 255, 236)']
    const capsuleColors = ['rgb(237, 54, 50)', 'rgb(117, 117, 117)', 'rgb(162, 205, 90)']
    const $capsule = this._obj.find('[data-testid=capsule]')
    const $status = capsuleStatus.indexOf($capsule.text())

    this.assert(
      this._obj.css('backgroundColor') === rowColors[$status] &&
        $capsule.css('backgroundColor') === capsuleColors[$status],
      `expected #{this} background and capsule background should be match`,
      `expected #{this} background and capsule background should not be match`,
      this._obj
    )
  }

  _chai.Assertion.addMethod('rightCapsuleColor', assertIsRightCapsuleColor)
}
chai.use(isRightCapsuleColor)
