const isSortByTableHeadCell = (_chai, _) => {
  function assertIsSortByTableHeadCell(_) {
    this.assert(
      this._obj.css('fontWeight') === '600' &&
        this._obj.css('color') === 'rgb(237, 54, 50)' &&
        this._obj.css('backgroundColor') === 'rgb(245, 245, 245)',
      'expected #{this} css font-weight to be 600, css color = rgb(237, 54, 50) and background-color = rgb(245, 245, 245',
      'expected #{this} css font-weight not to be 600, css color = rgb(237, 54, 50) and background-color = rgb(237, 54, 50)',
      this._obj
    )
  }

  _chai.Assertion.addMethod('sortByTableHeadCell', assertIsSortByTableHeadCell)
}
chai.use(isSortByTableHeadCell)
