/// <reference types="cypress" />

context('Work Edit', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
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
      .contains('作品管理')
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('workId')
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('作品を編集')
      .click()
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/comics/work/edit/${this.workId}`)
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('作品管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.comic}>作品一覧>作品編集`)
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/work')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
})
