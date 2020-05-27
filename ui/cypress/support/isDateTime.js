const isDateTime = (_chai, _) => {
  function assertIsDateTime(props) {
    const { asText = false } = typeof props === 'object' ? props : {}

    if (asText) {
      this.assert(
        /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/gi.test(this._obj),
        'expected #{this} has format as YYYY-MM-DD hh:mm',
        "expected #{this} doesn't have format YYYY-MM-DD hh:mm",
        this._obj
      )
      return
    }

    this.assert(
      /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/gi.test(this._obj.text()),
      "expected #{this}'s text has format YYYY-MM-DD hh:mm",
      "expected #{this}'s text doesn't have format YYYY-MM-DD hh:mm",
      this._obj
    )
  }

  _chai.Assertion.addMethod('dateTimeFormat', assertIsDateTime)
}
chai.use(isDateTime)
