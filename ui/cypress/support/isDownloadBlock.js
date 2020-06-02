const isDownloadBlock = (_chai, _) => {
  function assertIsDownloadBlock() {
    const $downloadIcon = this._obj.find('[data-testid=download-icon]')
    this.assert(
      !!this._obj.text() && $downloadIcon !== undefined,
      'expected #{this} text should be not empty and download icon should be exist',
      'expected #{this} text should be empty and download icon should not be exist.',
      this._obj
    )
  }

  _chai.Assertion.addMethod('downloadBlock', assertIsDownloadBlock)
}
chai.use(isDownloadBlock)
