context('Author List', () => {
  const targetRoute = '/#/comics/author'
  const targetTab = '著者管理'

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
      .contains(targetTab)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click author tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains(targetTab)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Show correct page title and breadcrumb', function() {
    const pageTitle = '著者一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Show correct buttons', () => {
    cy.findByTestId('content-header-buttons')
      .children('button')
      .should('contain', '著者を登録')
      .its('length')
      .should('equal', 1)

    cy.findByTestId('search-filter-buttons')
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Show Search Form correctly', () => {
    cy.findByTestId('search_filter')
      .children('form')
      .within(() => {
        cy.findAllByTestId('search_filter_item').should('have.length', 1)
        cy.findByTestId('search-filter-item-label').should('contain', '著者（ID）')
        cy.findByTestId('search_input').within($input => {
          cy.findByTestId('search_icon').should('be.exist')
          cy.wrap($input)
            .children('input')
            .should('have.attr', 'placeholder', 'フリーワードで検索')
        })
      })
  })

  it('Show Table List correctly ', () => {
    const tableColumnNum = 4
    cy.findAllByTestId('list-table')
      .should('have.length', 1)
      .within(() => {
        cy.findByTestId('list-table-pagination').should('contain', '全1000件表示（1~100件目を表示）')

        cy.findByTestId('table-head-row')
          .children('th')
          .should('have.length', tableColumnNum)
          .first()
          .should('contain', '作成日時')
          .and('is.sortByTableHeadCell', { sorting: true })
          .next()
          .should('contain', 'ID')
          .next()
          .should('contain', '著者名')

        cy.findAllByTestId('list-table-row').each($row => {
          cy.wrap($row)
            .children('td')
            .should('have.length', tableColumnNum)
        })

        cy.findByTestId('pagination').should('be.exist')
      })
  })
})
