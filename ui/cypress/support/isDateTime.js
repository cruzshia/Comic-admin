const isDateTime = (_chai, _) => {
  function assertIsDateTime() {
    this.assert(
      /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/gi.test(this._obj.text()),
      'expected #{this} has format YYYY-MM-DD hh:mm',
      "expected #{this} doesn't have format YYYY-MM-DD hh:mm",
      this._obj
    )
  }

  _chai.Assertion.addMethod('dateTimeFormat', assertIsDateTime)
}
chai.use(isDateTime)
