/// <reference types="cypress" />

context('Coin Product Detail', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(2)
      .click()
      .invoke('text')
      .as('productId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/application/coin_product/detail/${this.productId}`)
      })
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title,breadcrumb and button', function() {
    const pageTitle = 'コインプロダクト詳細'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.coinProduct.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/coin_product')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'コインプロダクトを編集')
  })
})
