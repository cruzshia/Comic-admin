/// <reference types="cypress" />

context('Display Setting List', () => {
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

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アプリ画面設定一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.application}>${pageTitle}`)
  })

  it('Show correct buttons', () => {
    cy.findByTestId('content-header-buttons').should('contain', 'アプリ画面を登録')
  })

  it('Renders correct search form', () => {
    cy.findByTestId('search_filter').should('be.exist')

    cy.findByTestId('search-filter-items-left').as('filterLeft')

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .first()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .should('contain', '画面')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .last()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .should('contain', '配信開始日時')
        cy.get('@searchItem')
          .findByTestId('time_span_input')
          .should('be.exist')
      })

    cy.findByTestId('search-filter-items-right')
      .findByTestId('search_filter_item')
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .should('contain', 'ステータス')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })
  })

  it('Renders correct search button', () => {
    cy.findByTestId('search-filter-buttons')
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', () => {
    const tableColNum = 6
    cy.findByTestId('list-table')
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId('list-table-pagination')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId('list-table-button')
      .should('have.text', '削除する')

    cy.get('@listTable')
      .findByTestId('table-head-row')
      .children('th')
      .should('have.lengthOf', tableColNum)
      .eq(1)
      .should('have.text', 'ステータス')
      .next()
      .should('have.text', '画面')
      .next()
      .should('have.text', '配信開始日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('have.text', '作成日時')
      .click()
      .and('be.sortableHeadCell', { sorting: true })

    cy.get('@listTable')
      .findAllByTestId('list-table-row')
      .first()
      .findAllByTestId('list-table-row-cell')
      .should('have.lengthOf', tableColNum)
  })
})
