const isShortInput = (_chai, _) => {
  function assertIsShortInput() {
    this.assert(
      this._obj.css('maxWidth') === '205px',
      'expected #{this} css max-width to be 205 ',
      'expected #{this} css max-width not to be 205',
      this._obj
    )
  }

  _chai.Assertion.addMethod('shortInput', assertIsShortInput)
}
chai.use(isShortInput)
