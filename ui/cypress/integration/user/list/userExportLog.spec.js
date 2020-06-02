context('User Export Logs', () => {
  const targetRoute = '/#/user/list/export_logs'
  const pageTitle = 'CSV出力ログ'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.management)
      .click()
    cy.findAllByTestId(this.testIds.button.normal)
      .contains(pageTitle)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click user list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.userList.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/list')
  })

  it('Renders correct list table', function() {
    const tableColNum = 5

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')
    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')
    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', '作成日時')
      .next()
      .should('have.text', '更新日時')
      .next()
      .should('have.text', 'ファイル名')
      .next()
      .should('have.text', '状態')
      .next()
      .should('have.text', '詳細')
    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .within(() => {
        cy.findAllByTestId(this.testIds.listTable.tableRowCell)
          .should('have.lengthOf', tableColNum)
          .eq(2)
          .should('be.downloadBlock')
      })
  })
})
