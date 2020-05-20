/// <reference types="cypress" />

context('Campaign Edit', () => {
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
      .contains(this.tabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()

    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .click()
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/comics/campaign/edit/[\\w|\-]+`))
      })
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'キャンペーン編集'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.tabs.comic}>${this.tabs.campaign.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/campaign')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
})
