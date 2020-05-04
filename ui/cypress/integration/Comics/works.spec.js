/// <reference types="cypress" />

context('Works', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains('マンガ管理')
      .click()
  })

  it('Click tab comics_management renders right style', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('作品管理')
      .parent()
      .should('have.css', 'fontWeight', '700')
      .and('have.css', 'backgroundColor', 'rgb(245, 245, 245)')
  })
})
