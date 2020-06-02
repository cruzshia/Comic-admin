context('Gift Comics Import Logs', () => {
  const targetRoute = '/#/user/gift_comics/batch_logs'
  const pageTitle = 'CSV一括贈答（マンガ）ログ'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('tabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.tabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.giftComics.id)
      .click()
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .contains('CSV登録ログ')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click gift coins tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.giftComics.id)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.user}>${this.tabs.giftComics.creation}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/gift_comics/creation')
  })

  it('Renders correct list table', function() {
    const tableColNum = 7

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
      .and('be.sortableHeadCell', true)
      .next()
      .should('have.text', '予約日時')
      .next()
      .should('have.text', '開始日時')
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
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
      .eq(4)
      .should('be.downloadBlock')
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
