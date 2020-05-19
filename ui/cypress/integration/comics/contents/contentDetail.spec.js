/// <reference types="cypress" />

context('Content Detail Page ', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab and table row route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('コンテンツ管理')
      .click()
    cy.findAllByTestId(this.testIds.listTable.id)
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .eq(1)
      .click()
      .invoke('text')
      .as('contentId')
      .then(() => cy.url().should('include', `comics/content/detail/${this.contentId}`))
      .as('targetRoute')
  })

  it('Renders selected style when click content tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('コンテンツ管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('be.exist')
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.headerTabs.comic}>コンテンツ一覧>コンテンツ詳細`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/content')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'コンテンツを編集')
  })
})
