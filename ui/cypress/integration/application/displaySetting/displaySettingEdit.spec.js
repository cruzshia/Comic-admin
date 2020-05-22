/// <reference types="cypress" />

context('DisplaySetting Edit', () => {
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
      .contains(this.tabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.displaySetting.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()

    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .click()
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/application/display_setting/edit/\\d+`))
      })
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.displaySetting.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アプリ画面設定編集'

    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.application}>${this.tabs.displaySetting.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/display_setting')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
})
