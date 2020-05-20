context('User Notification List', () => {
  const targetRoute = '/#/user/notification'
  const tableColNum = 6

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
      .contains(this.headerTabs.notification.management)
      .click()
      .parent()
      .should('be.sideTabSelected')
      .url()
      .should('include', targetRoute)
  })

  it('Renders correct breadcrumbs , title ,header-buttons', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.headerTabs.user}>${this.headerTabs.notification.list}`
    )
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', this.headerTabs.notification.list)
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('contain', 'お知らせを登録')
  })
  it('Renders correct searchForm ', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findAllByTestId(this.testIds.searchFilter.id).within(() => {
      cy.findAllByTestId(this.testIds.searchFilter.itemsLeft)
        .children(`[data-testid=${this.testIds.searchFilter.item}]`)
        .should('have.length', 1)
        .first()
        .should($item => {
          expect($item.find(ITEM_LABEL_SELECTOR)).contain('タイトル（ID）')
          expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
        })

      cy.findAllByTestId(this.testIds.searchFilter.itemsRight)
        .children(`[data-testid=${this.testIds.searchFilter.item}]`)
        .should('have.length', 2)
        .first()
        .should($item => {
          expect($item.find(ITEM_LABEL_SELECTOR)).contain('アプリID')
          expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
        })
        .next()
        .should($item => {
          expect($item.find(ITEM_LABEL_SELECTOR)).contain('開始日時')
          expect($item.find(`[data-testid=${this.testIds.inputs.dateTime}]`)).have.exist
        })

      cy.findAllByTestId(this.testIds.searchFilter.buttons)
        .children()
        .should('be.rightSearchBtn')
    })
  })

  it('Renders correct ListTable ', function() {
    cy.findAllByTestId(this.testIds.listTable.id).within(() => {
      cy.findAllByTestId(this.testIds.listTable.tableHead)
        .children('th')
        .first()
        .should('be.sortableHeadCell', { sorting: true })
        .and('contain', '作成日時')
        .next()
        .should('contain', 'ID')
        .next()
        .should('contain', 'タイトル')
        .next()
        .should('contain', 'アプリ')
        .next()
        .should('be.sortableHeadCell')
        .and('contain', '公開開始日')
        .next()
        .should('contain', '公開終了日')
      cy.findAllByTestId(this.testIds.listTable.tableRow)
        .first()
        .children('td')
        .should('have.lengthOf', tableColNum)

      cy.findAllByTestId(this.testIds.listTable.pageInfo).should('be.exist')
      cy.findAllByTestId(this.testIds.pager).should('be.exist')
    })
  })
})
