/// <reference types="cypress" />

context('CoinDeliveryEventEdit', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('コイン付与イベントを編集')
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/application/coin_delivery_event/edit/[\\w|\-]`))
  })

  it('Renders selected style when click coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コイン付与イベント編集'
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.coinDeliveryEvent.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/coin_delivery_event')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '登録')
  })
})
