/// <reference types="cypress" />

context('UserList', () => {
  const targetRoute = '/#/user/list'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.user)
      .click()
    cy.url().should('include', targetRoute)
  })

  it('Renders selected style when click user list tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('ユーザー一覧')
      .parent()
      .should('be.sideTabSelected')
  })
})
