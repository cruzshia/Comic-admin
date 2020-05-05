/// <reference types="cypress" />

context('DisplaySettings', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains('アプリ管理')
      .click()
  })

  it('Click tab display_setting renders right style', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('アプリ画面設定管理')
      .parent()
      .should('be.sideTabSelected')
  })
})
