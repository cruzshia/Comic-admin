/// <reference types="cypress" />

context('Campaign List', () => {
  const targetRoute = '/#/comics/campaign'

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
          .contains('キャンペーン管理')
          .click()
        cy.url().should('include', targetRoute)
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId('sidebar-tab')
      .contains('キャンペーン管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'キャンペーン一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Shows correct content header button', () => {
    cy.findByTestId('content-header-buttons').should('contain', 'キャンペーンを登録')
  })

  it('Renders correct search form', () => {
    cy.findByTestId('search_filter').should('be.exist')
    cy.findByTestId('search-filter-items-left')
      .findByTestId('search_filter_item')
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('キャンペーン名')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.findByTestId('search-filter-items-right').as('filterRight')
    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .first()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('開始日時')
        cy.get('@searchItem')
          .findByTestId('time_span_input')
          .should('be.exist')
      })
    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .eq(1)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('終了日時')
        cy.get('@searchItem')
          .findByTestId('time_span_input')
          .should('be.exist')
      })
  })

  it('Renders correct search button', () => {
    cy.findByTestId('search-filter-buttons')
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })
})
