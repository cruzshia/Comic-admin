context('Coin Product List', () => {
  const targetRoute = '/#/application/coin_product'
  const pageTitle = 'コインプロダクト一覧'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')

    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()

    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click coin product list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.application}>${pageTitle}`)
  })

  it('Show correct buttons', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'コインプロダクトを登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`

    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')

    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('プロダクトID')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('公開開始日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })

    cy.findByTestId(this.testIds.searchFilter.itemsRight)
      .findByTestId(this.testIds.searchFilter.item)
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('ステータス')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
  })

  it('Renders correct search button', function() {
    cy.findAllByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', function() {
    const tableColNum = 7

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('contain', '作成日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('contain', '公開開始日時')
      .and('be.sortableHeadCell')
      .next()
      .should('contain', 'プロダクトID')
      .next()
      .should('contain', 'アプリID')
      .next()
      .should('contain', '購入コイン')
      .next()
      .should('contain', '購入お得コイン')
      .next()
      .should('contain', 'ステータス')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
