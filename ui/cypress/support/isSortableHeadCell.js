const isSortableHeadCell = (_chai, _) => {
  function assertIsSortableHeadCell(props) {
    const { sorting = false } = typeof props === 'object' ? props : {}
    const $sortIcon = this._obj.find('[data-testid=sort-icon]')

    this.assert(
      this._obj.css('color') === 'rgb(237, 54, 50)' && $sortIcon !== undefined && $sortIcon.css('opacity') === sorting
        ? '1'
        : '0',
      'expected #{this} css font-weight to be 600, css color = rgb(237, 54, 50) and background-color = rgb(245, 245, 245)',
      'expected #{this} css font-weight not to be 600, css color = rgb(237, 54, 50) and background-color = rgb(237, 54, 50)',
      this._obj
    )

    if (sorting) {
      this.assert(
        this._obj.css('backgroundColor') === 'rgb(245, 245, 245)' && this._obj.css('fontWeight') === '600',
        'expected #{this} has sort icon/backgroundColor rgb(245, 245, 245)/font-weight 600',
        "expected #{this} doesn't have sort icon/backgroundColor rgb(245, 245, 245)/font-weight 600",
        this._obj
      )
    }
  }

  _chai.Assertion.addMethod('sortableHeadCell', assertIsSortableHeadCell)
}
chai.use(isSortableHeadCell)
