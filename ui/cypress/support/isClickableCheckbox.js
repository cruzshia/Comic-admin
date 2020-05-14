const isClickableCheckbox = (_chai, _) => {
  function assertIsClickableCheckbox(props) {
    const { isClicked = false } = typeof props === 'object' ? props : {}
    const $checkbox = this._obj.find('input[type=checkbox]')

    this.assert(
      $checkbox.checked === isClicked && this._obj.css('color') === isClicked ? 'rgb(237, 54, 50)' : 'rgb(51, 51, 51)',
      'expected #{this} checkbox background color should be rgb(237, 54, 50)',
      'expected #{this} checkbox background should not be rgb(237, 54, 50)',
      this._obj
    )
  }

  _chai.Assertion.addMethod('clickableCheckbox', assertIsClickableCheckbox)
}
chai.use(isClickableCheckbox)
