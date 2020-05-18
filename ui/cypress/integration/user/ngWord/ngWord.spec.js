context('NG Word', () => {
  const targetRoute = '/#/user/ng_word'
  const pageTitle = 'NGワード管理'

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
      .contains(pageTitle)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click NG word tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.user}>${pageTitle}`)
  })

  it('Renders NG word Tab', function() {
    cy.findAllByTestId(this.testIds.ngWord.tab)
      .first()
      .should('contain', 'コメントNGワード')
      .and('have.css', 'backgroundColor', 'rgb(255, 255, 255)')
      .and('have.css', 'borderBottom', '0px none rgb(51, 51, 51)')
      .next()
      .should('contain', 'アカウントNGワード')
      .click()
      .and('have.css', 'backgroundColor', 'rgb(255, 255, 255)')
      .and('have.css', 'borderBottom', '0px none rgb(51, 51, 51)')
  })

  it('Renders NG word form', function() {
    cy.findByTestId(this.testIds.ngWord.form)
      .children('button')
      .should('contain', '登録')
  })
})
