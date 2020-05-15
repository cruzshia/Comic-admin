context('Comment List', () => {
  const targetRoute = '/#/user/comment'
  const pageTitle = 'コメント一覧'

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
      .contains(pageTitle)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click comment list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
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

    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('コンテンツ（ID）')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('作品（ID）')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('ユーザーID')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('メールアドレス')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })

    cy.findByTestId(this.testIds.searchFilter.itemsRight)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('通報の有無')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('ステータス')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('アプリID')
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
    const tableColNum = 8

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')

    cy.findByTestId(this.testIds.listTable.button).should('have.text', 'CSV出力')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('be.clickableCheckbox')
      .next()
      .should('contain', '作成日時')
      .and('be.sortableHeadCell')
      .next()
      .should('contain', 'ユーザーID')
      .and('be.sortableHeadCell')
      .next()
      .should('contain', 'コンテンツ')
      .and('be.sortableHeadCell')
      .next()
      .should('contain', 'メッセージ')
      .next()
      .should('contain', 'いいね数')
      .and('be.sortableHeadCell')
      .next()
      .should('contain', '通報')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('contain', 'ステータス')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
  })

  it('List table checkbox should have correct behaviour', function() {
    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .findAllByTestId(this.testIds.checkbox)
      .as('allCheckbox')
      .should('be.clickableCheckbox')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .findByTestId(this.testIds.checkbox)
      .as('clickAll')
      .click()

    cy.get('@allCheckbox').should('be.clickableCheckbox', { isClicked: true })
    cy.findAllByTestId(this.testIds.listTable.button)
      .find('button')
      .first()
      .should('have.text', 'CSV出力')
      .next()
      .should('have.text', '削除する')
      .next()
      .should('have.text', '本人にのみ表示')

    cy.get('@clickAll').click()
    cy.get('@allCheckbox').should('be.clickableCheckbox')
    cy.findByTestId(this.testIds.listTable.button).should('have.text', 'CSV出力')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findByTestId(this.testIds.checkbox)
      .as('tableRowCheckbox')
      .click()
      .should('be.clickableCheckbox', { isClicked: true })

    cy.findAllByTestId(this.testIds.listTable.button)
      .find('button')
      .first()
      .should('have.text', 'CSV出力')
      .next()
      .should('have.text', '削除する')
      .next()
      .should('have.text', '本人にのみ表示')

    cy.get('@tableRowCheckbox')
      .click()
      .should('be.clickableCheckbox')
    cy.findByTestId(this.testIds.listTable.button).should('have.text', 'CSV出力')
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
