context('Coin Product Creation', () => {
  const targetRoute = '/#/user/gift_coins/creation'
  const sidebarTab = '贈答（コイン）'
  const pageTitle = 'CSV一括贈答（コイン）'

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
      .contains('贈答（コイン）')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click coin product creation tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(sidebarTab)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.user}>${pageTitle}`)
  })

  it('Show correct buttons', function() {
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('have.lengthOf', 3)
      .first()
      .should('contain', '登録')
      .next()
      .should('contain', 'テンプレート（Shift_JIS）')
      .next()
      .should('contain', 'CSV登録ログ')
  })
})
