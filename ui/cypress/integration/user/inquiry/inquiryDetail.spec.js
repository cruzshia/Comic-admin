/// <reference types="cypress" />

context('Inquiry Detail', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('tabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.tabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.inquiry.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('inquiryId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/user/inquiry/detail/${this.inquiryId}`))
      })
  })

  it('Renders selected tab style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.inquiry.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'お問い合わせ詳細'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.user}>${this.tabs.inquiry.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/inquiry')
  })
})
