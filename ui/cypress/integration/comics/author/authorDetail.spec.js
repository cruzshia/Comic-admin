/// <reference types="cypress" />

context('Author Detail', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.author.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('authorId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/comics/author/detail/${this.authorId}`)
      })
  })

  it('Renders selected sidebar tab style', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.author.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '著者詳細'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.comic}>${this.headerTabs.author.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/author')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '著者を編集')
  })
})
