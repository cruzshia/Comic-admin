/// <reference types="cypress" />

context('Coin Delivery Event List', () => {
  const targetRoute = '/#/application/coin_delivery_event'
  const tab = 'コイン付与イベント管理'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.application)
      .click()
      .then(() => {
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains(tab)
          .click()
          .url()
          .should('include', targetRoute)
      })
  })

  it('Renders selected style when coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(tab)
      .parent()
      .should('be.sideTabSelected')
  })
})
