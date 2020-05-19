/// <reference types="cypress" />

context('Campaign List', () => {
  const targetRoute = '/#/comics/campaign'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('tabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.tabs.comic)
      .click()
      .then(() => {
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains(this.tabs.campaign.management)
          .click()
          .url()
          .should('include', targetRoute)
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', this.tabs.campaign.list)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.tabs.comic}>${this.tabs.campaign.list}`)
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'キャンペーンを登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')
    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .findByTestId(this.testIds.searchFilter.item)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId(this.testIds.searchFilter.itemLabel)
          .contains('キャンペーン名')
        cy.get('@searchItem')
          .findByTestId(this.testIds.inputs.search)
          .should('be.exist')
      })

    cy.findByTestId(this.testIds.searchFilter.itemsRight)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('開始日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('終了日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
      })
  })

  it('Renders correct search button', function() {
    cy.findByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', function() {
    const tableColNum = 4
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
      .should('have.text', 'キャンペーン名')
      .next()
      .should('have.text', '開始日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('have.text', '終了日時')
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
