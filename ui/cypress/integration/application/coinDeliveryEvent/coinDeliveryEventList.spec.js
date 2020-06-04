/// <reference types="cypress" />

context('Coin Delivery Event List', () => {
  const targetRoute = '/#/application/coin_delivery_event'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.application)
      .click()
      .then(() => {
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains(this.headerTabs.coinDeliveryEvent.management)
          .click()
          .url()
          .should('include', targetRoute)
      })
  })

  it('Renders selected style when coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', this.headerTabs.coinDeliveryEvent.list)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.headerTabs.application}>${this.headerTabs.coinDeliveryEvent.list}`
    )
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'コイン付与イベントを登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')
    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('イベント名')
        expect($item.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('公開開始日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })

    cy.findByTestId('search-filter-items-right')
      .findByTestId(this.testIds.searchFilter.item)
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('イベント種別')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
  })

  it('Renders correct search button', function() {
    cy.findByTestId(this.testIds.searchFilter.buttons)
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
      .should('have.text', 'イベントID')
      .next()
      .should('have.text', 'イベント名')
      .next()
      .should('have.text', 'イベント種別')
      .next()
      .should('have.text', '公開開始日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('have.text', '公開終了日時')
      .and('be.sortableHeadCell')
      .click()
      .should('be.sortableHeadCell', { sorting: true })

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
