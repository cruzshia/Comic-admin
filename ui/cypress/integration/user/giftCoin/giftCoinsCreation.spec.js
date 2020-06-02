context('Gift Coin Creation', () => {
  const targetRoute = '/#/user/gift_coins/creation'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')

    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()

    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.giftCoins.id)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click gift coins tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.giftCoins.id)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', this.headerTabs.giftCoins.creation)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.giftCoins.creation}`
    )
  })

  it('Show correct buttons', function() {
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('have.lengthOf', 3)
      .first()
      .should('have.text', '登録')
      .next()
      .should('have.text', 'テンプレート（Shift_JIS）')
      .next()
      .should('have.text', 'CSV登録ログ')
  })

  it('Renders correct creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
    cy.findAllByTestId(this.testIds.dataTable.row)
      .should('have.length', 2)
      .first()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).have.text('CSVファイル')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.button.normal}]`)).have.text(
          'ファイルを選択'
        )
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).have.text('スケジュール')
        expect(
          $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
        ).to.be.exist.and.have.timePlaceholder()
      })
  })
})
