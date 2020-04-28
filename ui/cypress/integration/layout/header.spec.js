/// <reference types="cypress" />

context('Headers', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('header render right tabs', () => {
    const tabs = ['マンガ管理', 'アプリ管理', 'ユーザー管理', 'レポート', 'システム']
    cy.findAllByTestId('header-tab').then($tabs => {
      expect($tabs).to.have.length(tabs.length)
      $tabs.each((idx, $tab) => {
        cy.wrap($tab).should('contain', tabs[idx])
      })
    })
  })

  it('header tab route correctly', () => {
    cy.findAllByTestId('header-tab').then($tabs => {
      $tabs.each((_, $tab) => {
        cy.wrap($tab).then(hrefDom => {
          hrefDom.click()
          cy.url().should('include', hrefDom.parent().attr('href'))
        })
      })
    })
  })
})
