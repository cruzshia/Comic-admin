/// <reference types="cypress" />

context('Questionnaire Edit', () => {
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
      .children('td')
      .eq(0)
      .click()
      .invoke('text')
      .as('questionId')
      .then(function() {
        cy.findByTestId(this.testIds.contentHeaderButtons)
          .contains('アンケートを編集')
          .click()
          .url()
          .as('targetRoute')
          .should('include', `/#/user/questionnaire/edit/${this.questionId}`)
      })
  })

  it('Renders selected sidebar tab style', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アンケート編集'
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
