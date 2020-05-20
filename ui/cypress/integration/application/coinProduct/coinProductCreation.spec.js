/// <reference types="cypress" />

context('Coin Product Creation', () => {
  const targetRoute = '/#/application/coin_product/creation'
  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .click()

    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('コインプロダクトを登録')
      .click()
      .url()
      .should('include', targetRoute)
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .parent()
      .should('be.sideTabSelected')
  })
  it('Shows correct page title,breadcrumb and header buttons', function() {
    const pageTitle = 'コインプロダクト登録'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.coinProduct.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/coin_product')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
})
