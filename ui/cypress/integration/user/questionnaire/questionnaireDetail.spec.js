/// <reference types="cypress" />

context('Questionnaire Detail', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
    cy.url()
      .as('targetRoute')
      .should('match', new RegExp(`#/user/questionnaire/detail/[\\w\]`))
  })

  it('Renders selected sidebar tab style', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アンケート詳細'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.questionnaire.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/questionnaire')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('have.length', 3)
      .first()
      .should('have.text', 'アンケートを編集')
      .next()
      .should('have.text', 'スマホ用プレビュー')
      .next()
      .should('have.text', 'PC用プレビュー')
  })
})
