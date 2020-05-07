/// <reference types="cypress" />

context('DisplaySettingList', () => {
  const targetRoute = '#/application/display_setting'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.application)
      .click()
    cy.url().should('include', targetRoute)
  })

  it('Renders selected style when click user list tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('アプリ画面設定管理')
      .parent()
      .should('be.sideTabSelected')
  })
})
