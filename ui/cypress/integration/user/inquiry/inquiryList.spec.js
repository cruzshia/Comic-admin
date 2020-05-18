context('Inquiry List', () => {
  const targetRoute = '/#/user/inquiry'
  const sidebarTab = 'お問い合わせ管理'
  const pageTitle = 'お問い合わせ一覧'

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
      .contains(sidebarTab)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click inquiry list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(sidebarTab)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.user}>${pageTitle}`)
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`

    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')

    cy.findAllByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .should('have.lengthOf', 4)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('ID')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('メールアドレス')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('名前')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('メッセージ')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })

    cy.findAllByTestId(this.testIds.searchFilter.itemsRight)
      .findAllByTestId(this.testIds.searchFilter.item)
      .should('have.lengthOf', 3)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('アプリID')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('問い合わせ種別')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('期間')
        expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
      })
  })

  it('Renders correct search button', function() {
    cy.findAllByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', function() {
    const tableColNum = 6

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.pageInfo)
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', 'お問い合わせ日時')
      .next()
      .should('have.text', 'ID')
      .next()
      .should('have.text', '問い合わせ種別')
      .next()
      .should('have.text', 'メッセージ')
      .next()
      .should('have.text', 'アプリID')
      .next()
      .should('have.text', 'アプリバージョン')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
