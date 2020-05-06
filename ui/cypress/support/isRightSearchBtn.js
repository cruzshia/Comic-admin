const isRightSearchBtn = (_chai, _) => {
  function assertIsRightSearchBtn(_) {
    this.assert(
      this._obj.eq(0).text() === '検索',
      'expected #{this} child button 0 should have text content "検索"',
      'expected #{this} child button 0 should not have text content "検索"',
      this._obj
    )
    this.assert(
      this._obj.eq(1).text() === '内容をリセット',
      'expected #{this} child button 1 should have text content "内容をリセット"',
      'expected #{this} child button 1 should not have text content "内容をリセット"',
      this._obj
    )
  }

  _chai.Assertion.addMethod('rightSearchBtn', assertIsRightSearchBtn)
}
chai.use(isRightSearchBtn)
