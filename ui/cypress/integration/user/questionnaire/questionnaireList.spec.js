/// <reference types="cypress" />

context('Questionnaire List', () => {
  const targetRoute = '/#/user/questionnaire'
  const sidebarTab = 'アンケート管理'
  const pageTitle = 'アンケート一覧'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()

    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(sidebarTab)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click questionnaire list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(sidebarTab)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.user}>${pageTitle}`)
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'アンケートを登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`

    cy.findByTestId(this.testIds.searchFilter.id)
      .as('searchFilter')
      .should('be.exist')

    cy.get('@searchFilter')
      .findByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .should('have.length', 2)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).contain('アンケート（ID）')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).contain('コンテンツ（ID）')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })

    cy.get('@searchFilter')
      .findByTestId(this.testIds.searchFilter.itemsRight)
      .findByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).contain('アンケート種別')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
  })

  it('Renders correct search buttons', function() {
    cy.findByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', function() {
    const tableColNum = 6

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('contain', 'アンケートID')
      .next()
      .should('contain', 'アンケート名')
      .next()
      .should('contain', '配信開始日')
      .next()
      .should('contain', '配信終了開始日')
      .next()
      .should('contain', '回答後に付与されるコインの枚数')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.length', tableColNum)
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
