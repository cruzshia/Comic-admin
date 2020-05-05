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
      .should('be.sideTabSelected')
  })

  it('Click tab comics_management in sidebar renders work list page', () => {
    cy.findAllByTestId('content-header-title').should('contain', '作品一覧')
    cy.findAllByTestId('breadcrumbs').should('have.text', 'マンガ管理>作品一覧')
    cy.findAllByTestId('content-header-buttons')
      .children('button')
      .then($buttons => {
        const buttons = ['作品を登録', 'CSV登録', 'CSV登録ログ']
        $buttons.each((idx, $button) => expect($button.innerText).equals(buttons[idx]))
      })
    cy.findAllByTestId('search-filter-buttons')
      .children('button')
      .then($buttons => {
        const buttons = ['検索', '内容をリセット']
        $buttons.each((idx, $button) => expect($button.innerText).equals(buttons[idx]))
      })
    cy.findAllByTestId('pagination').should('not.be.empty')
  })
})
