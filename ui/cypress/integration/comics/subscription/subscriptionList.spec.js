context('Subscription List', () => {
  const targetRoute = '/#/comics/subscription'

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
          .contains('定期購読管理')
          .click()
        cy.url().should('include', targetRoute)
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId('sidebar-tab')
      .contains('定期購読管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '定期購読一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Shows correct content header button', () => {
    cy.findByTestId('content-header-buttons').should('contain', '定期購読を登録')
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })

  it('Renders correct list table', () => {
    const tableColNum = 5

    cy.findByTestId('list-table')
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId('list-table-pagination')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId('table-head-row')
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', '作成日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('have.text', 'ID')
      .next()
      .should('have.text', '定期購読名')
      .next()
      .should('have.text', '公開開始日時')
      .and('be.sortableHeadCell')
      .next()
      .should('have.text', '公開終了日時')
      .and('be.sortableHeadCell')
      .click()
      .should('be.sortableHeadCell', { sorting: true })
      .first()
      .and('be.sortableHeadCell')

    cy.get('@listTable')
      .findAllByTestId('list-table-row')
      .first()
      .findAllByTestId('list-table-row-cell')
      .should('have.lengthOf', tableColNum)
  })
})
