/// <reference types="cypress" />

context('Magazine Purchase detail', () => {
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
          .contains('ストア購入履歴')
          .siblings()
          .children('a')
          .click()
        cy.findAllByTestId(this.testIds.listTable.tableRow)
          .first()
          .click()
          .url()
          .should('match', new RegExp(`user/list/history/${this.userId}/magazine_purchase/\\w+`))
          .as('targetRoute')
      })
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.list)
      .parent()
      .should('be.sideTabSelected')
  })
  it('Renders correct breadcrumbs , pageTitle ', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should(
        'have.text',
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}>雑誌/コミックス購入履歴一覧>雑誌/コミックス購入履歴詳細`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 3)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
        expect($links.eq(2)).have.attr('href', `#/user/list/history/${this.userId}/magazine_purchase`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', '雑誌/コミックス購入履歴')
  })
})
