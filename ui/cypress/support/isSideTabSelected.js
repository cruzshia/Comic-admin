const isSideTabSelected = (_chai, _) => {
  function assertIsSideTabSelected(_) {
    this.assert(
      this._obj.css('fontWeight') === '700' && this._obj.css('backgroundColor') === 'rgb(245, 245, 245)',
      'expected #{this} css font-weight to be 700 and background-color = rgb(245, 245, 245)',
      'expected #{this} css font-weight not to be 700 and background-color = rgb(245, 245, 245)',
      this._obj
    )
  }

  _chai.Assertion.addMethod('sideTabSelected', assertIsSideTabSelected)
}

chai.use(isSideTabSelected)
