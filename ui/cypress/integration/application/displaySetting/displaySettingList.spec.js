/// <reference types="cypress" />

context('Display Setting List', () => {
  const targetRoute = '/#/application/display_setting'
  const pageTitle = 'アプリ画面設定一覧'

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
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click user list tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('アプリ画面設定管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.application}>${pageTitle}`)
  })

  it('Show correct buttons', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'アプリ画面を登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`

    cy.findByTestId('search_filter').should('be.exist')

    cy.findAllByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('画面')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('配信開始日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
      })

    cy.findByTestId('search-filter-items-right')
      .findByTestId('search_filter_item')
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
    const tableColNum = 6
    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.findByTestId(this.testIds.listTable.button).should('have.text', '削除する')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('be.clickableCheckbox')
      .next()
      .should('have.text', 'ステータス')
      .next()
      .should('have.text', '画面')
      .next()
      .should('have.text', '配信開始日時')
      .and('be.sortableHeadCell', { sorting: true })
      .next()
      .should('have.text', '作成日時')
      .click()
      .and('be.sortableHeadCell', { sorting: true })

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .each($row => {
        expect($row).to.be.rightCapsuleColor()
        cy.wrap($row)
          .findAllByTestId(this.testIds.listTable.tableRowCell)
          .should('have.lengthOf', tableColNum)
      })
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

    cy.get('@clickAll').click()
    cy.get('@allCheckbox').should('be.clickableCheckbox')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findByTestId(this.testIds.checkbox)
      .click()
      .should('be.clickableCheckbox', { isClicked: true })
      .click()
      .should('be.clickableCheckbox')
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
