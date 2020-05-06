/// <reference types="cypress" />

context('ContentList', () => {
  const targetRoute = '/#/comics/content'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.comic)
      .click()
      .then(() => {
        cy.findAllByTestId('sidebar-tab')
          .contains('コンテンツ管理')
          .click()
        cy.url().should('include', targetRoute)
      })
  })

  it('Renders selected style when click content tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('コンテンツ管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コンテンツ一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Shows correct content header button', () => {
    cy.findAllByTestId('content-header-buttons')
      .children('button')
      .then($btns =>
        $btns.each((_, $btn) => expect($btn.innerText).oneOf(['CSV登録ログ', 'CSV登録', 'コンテンツを登録']))
      )
  })

  it('Renders right search button', () => {
    cy.findByTestId('search-filter-buttons')
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })
})
