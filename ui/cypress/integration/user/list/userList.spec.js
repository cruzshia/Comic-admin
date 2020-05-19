/// <reference types="cypress" />

context('UserList', () => {
  const targetRoute = '/#/user/list'
  const pageTitle = 'ユーザー一覧'

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
      .url()
      .should('include', targetRoute)
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('ユーザー一覧')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click user list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('ユーザー一覧')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Renders correct breadcrumbs , title ,header-buttons', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.user}>${pageTitle}`)
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('have.length', 2)
      .first()
      .should('contain', 'CSV登録')
      .next()
      .should('contain', 'CSV登録ログ')
  })
  it('Renders correct searchForm ', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findAllByTestId(this.testIds.searchFilter.id)
      .children('form')
      .within(() => {
        cy.findAllByTestId(this.testIds.searchFilter.itemsLeft)
          .children(`[data-testid=${this.testIds.searchFilter.item}]`)
          .should('have.length', 4)
          .first()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('メールアドレス')
            expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('ニックネーム')
            expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).have.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('ユーザーID')
            expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).have.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('ステータス')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).have.exist
          })

        cy.findAllByTestId(this.testIds.searchFilter.itemsRight)
          .children(`[data-testid=${this.testIds.searchFilter.item}]`)
          .should('have.length', 3)
          .first()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('コメント権限')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('作成日時')
            expect($item.find(`[data-testid=${this.testIds.inputs.dateTime}]`)).have.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).contain('最終ログイン日時')
            expect($item.find(`[data-testid=${this.testIds.inputs.dateTime}]`)).have.exist
          })

        cy.findAllByTestId(this.testIds.searchFilter.buttons)
          .children()
          .should('have.length', 2)
          .should('be.rightSearchBtn')
      })
  })

  it('Renders correct ListTable ', function() {
    cy.findAllByTestId(this.testIds.listTable.id).within(() => {
      cy.findAllByTestId(this.testIds.listTable.tableHead)
        .children('th')
        .first()
        .should('be.sortableHeadCell', { sorting: true })
        .should('contain', '作成日時')
        .next()
        .should('be.sortableHeadCell')
        .should('contain', '最終ログイン日時')
        .next()
        .should('contain', 'メールアドレス')
        .next()
        .should('contain', 'ニックネーム')
        .next()
        .should('contain', 'ユーザーID')
        .next()
        .should('contain', 'ステータス')
      cy.findAllByTestId(this.testIds.listTable.tableRow).each(($item, idx) => {
        if ($item.find('td:nth-child(6)').text() === '退会済み') {
          cy.wrap($item).should('have.css', 'background-color', 'rgb(224, 224, 224)')
        }
        cy.wrap($item)
          .children('td')
          .should('have.length', 6)
      })
      cy.findAllByTestId(this.testIds.listTable.pageInfo).should('be.exist')
      cy.findAllByTestId(this.testIds.pager).should('be.exist')
      cy.findAllByTestId(this.testIds.listTable.button)
        .children('button')
        .should('have.length', 2)
        .first()
        .should('contain', 'CSV出力ログ')
        .next()
        .should('contain', 'CSV出力')
    })
  })
})
