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
          .contains('コンテンツ（ID）')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .eq(1)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('著者')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .eq(2)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('作品（ID）')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .last()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('アプリID')
        cy.get('@searchItem')
          .findByTestId('select')
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
          .contains('コンテンツ種別')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .eq(1)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('広告ユニット')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .eq(2)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('配信開始日時')
        cy.get('@searchItem')
          .findByTestId('time_span_input')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .last()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('配信終了日時')
        cy.get('@searchItem')
          .findByTestId('time_span_input')
          .should('be.exist')
      })
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })
})
