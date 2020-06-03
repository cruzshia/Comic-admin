/// <reference types="cypress" />

context('Questionnaire Creation', () => {
  const targetRoute = '#/user/questionnaire/creation'

  beforeEach(function() {
    cy.visit(targetRoute)
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

    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('アンケートを登録')
      .click()
      .url()
      .should('contain', targetRoute)
  })

  it('Renders selected sidebar tab style', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アンケート登録'
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
      .first()
      .should('have.text', '登録')
      .next()
      .should('have.text', 'スマホ用プレビュー')
      .next()
      .should('have.text', 'PC用プレビュー')
  })
})
