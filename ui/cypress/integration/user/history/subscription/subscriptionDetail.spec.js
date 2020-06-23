/// <reference types="cypress" />

context('Subscription detail', () => {
  const pageTitle = '定期購読履歴'

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
          .contains(pageTitle)
          .siblings()
          .children('a')
          .click()
        cy.findAllByTestId(this.testIds.listTable.tableRow)
          .first()
          .click()
          .url()
          .should('match', new RegExp(`user/list/history/${this.userId}/subscription/\\w+`))
          .as('targetRoute')
      })

    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Renders correct breadcrumbs , pageTitle ', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should(
        'have.text',
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}>定期購読履歴一覽>定期購読履歴詳細`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 3)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
        expect($links.eq(2)).have.attr('href', `#/user/list/history/${this.userId}/subscription`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
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
            expect($item.find(LABEL_SELECTOR)).have.text('ユーザーID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読ID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読名')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('価格')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('通貨')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読開始日時')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読更新日時')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読有効期限')
          })
      })
  })
})
