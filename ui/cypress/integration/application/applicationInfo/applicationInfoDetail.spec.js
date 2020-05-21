/// <reference types="cypress" />

context('Application Info Detail', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.applicationInfo.list)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(0)
      .click()
      .invoke('text')
      .as('appId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/application/application_info/detail/${this.appId}`)
      })
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.applicationInfo.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title,breadcrumb and button', function() {
    const pageTitle = 'アプリ情報詳細'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.applicationInfo.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/application_info')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', 'アプリ情報を編集')
  })
})
