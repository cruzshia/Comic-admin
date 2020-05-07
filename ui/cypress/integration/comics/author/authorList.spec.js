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

  it('Show pagination correctly', () => {
    cy.findByTestId('pagination').should('exist')
  })
})
