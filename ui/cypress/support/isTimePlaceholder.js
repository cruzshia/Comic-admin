const isTimePlaceholder = (_chai, _) => {
  function assertIsTimePlaceholder() {
    this.assert(
      this._obj.find('input').attr('placeholder') === 'YYYY-MM-DD hh:mm',
      'expected #{this} has placeholder YYYY-MM-DD hh:mm',
      "expected #{this} doesn't have placeholder YYYY-MM-DD hh:mm",
      this._obj
    )
  }

  _chai.Assertion.addMethod('timePlaceholder', assertIsTimePlaceholder)
}
chai.use(isTimePlaceholder)
