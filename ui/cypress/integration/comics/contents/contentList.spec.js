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
    cy.findAllByTestId('sidebar-tab')
      .contains('コンテンツ管理')
      .click()
    cy.url().should('include', targetRoute)
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
          .contains('コンテンツ名（ID）')
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
          .contains('著者名')
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
          .contains('作品名（ID）')
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

  it('Renders correct list table', () => {
    const tableColNum = 9

    cy.findByTestId('list-table')
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findAllByTestId('table-head-row')
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', '画像')
      .next()
      .should('have.text', 'コンテンツID')
      .next()
      .should('have.text', 'コンテンツ名')
      .next()
      .should('have.text', 'コンテンツ種別')
      .next()
      .should('have.text', 'コイン価格')
      .next()
      .should('have.text', 'キャンペーン価格')
      .next()
      .should('have.text', '並換コード')
      .next()
      .should('have.text', '作成日時')
      .and('be.sortableHeadCell', true)

    cy.get('@listTable')
      .findAllByTestId('list-table-row')
      .findAllByTestId('list-table-row-cell')
      .should('have.lengthOf', tableColNum)
  })

  it('Renders correct list table button and pagination information', () => {
    cy.findByTestId('list-table-button')
      .children('button')
      .should('contain', 'CSV出力')
    cy.findByTestId('list-table-pagination').should('be.exist')
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })
})
