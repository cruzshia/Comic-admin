/// <reference types="cypress" />

context('Pay coin charge detail', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.list)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(4)
      .click()
      .invoke('text')
      .as('userId')
      .then(() => {
        cy.findAllByTestId(this.testIds.dataTable.id)
          .contains('購入コインチャージ履歴')
          .siblings()
          .children('a')
          .click()
        cy.findAllByTestId(this.testIds.listTable.tableRow)
          .first()
          .click()
          .url()
          .should('match', new RegExp(`user/list/history/${this.userId}/pay_coin_charge/\\w+`))
          .as('targetRoute')
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains(this.headerTabs.userList.list)
          .parent()
          .should('be.sideTabSelected')
      })
  })

  it('Renders correct breadcrumbs , pageTitle ', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should(
        'have.text',
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}>有償コインチャージ履歴一覧>有償コインチャージ履歴詳細`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 3)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
        expect($links.eq(2)).have.attr('href', `#/user/list/history/${this.userId}/pay_coin_charge`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', '購入コインチャージ履歴')
  })

  it('Renders correct data table', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作成日時')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新日時')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ユーザーID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('履歴種別')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリ')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入コイン数')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入お得コイン数')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('贈答用購入コイン数')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('補足情報')
          })
      })
  })
})
