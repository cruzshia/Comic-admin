/// <reference types="cypress" />

context('Bonus coin charge list', () => {
  const pageTitle = 'ボーナスコインチャージ履歴'
  const columNum = 6

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
      .contains('ユーザー一覧')
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(4)
      .click()
      .invoke('text')
      .as('userId')
      .then(() => {
        cy.findAllByTestId('data-table')
          .contains('ボーナスコインチャージ履歴')
          .siblings()
          .children('a')
          .click()
          .url()
          .should('include', `user/list/history/${this.userId}/bonus_coin_charge`)
          .as('targetRoute')
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains('ユーザー一覧')
          .parent()
          .should('be.sideTabSelected')
      })
  })

  it('Renders correct breadcrumbs , pageTitle ', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should('contain', `ユーザー管理>ユーザー一覧>ユーザー詳細>${pageTitle}`)
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 2)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
  })

  it('Renders correct ListTable ', function() {
    cy.findAllByTestId(this.testIds.listTable.id).within(() => {
      cy.findAllByTestId(this.testIds.listTable.tableHead)
        .children('th')
        .first()
        .should('be.sortableHeadCell', { sorting: true })
        .and('contain', '作成日時')
        .next()
        .should('contain', '履歴種別')
        .next()
        .should('contain', 'アプリID')
        .next()
        .should('contain', 'キャンペーン詳細')
        .next()
        .should('contain', 'コインの増減数')
        .next()
        .should('contain', 'コイン種別毎の増減数')
      cy.findAllByTestId(this.testIds.listTable.tableRow)
        .first()
        .children('td')
        .should('have.length', columNum)

      cy.findAllByTestId(this.testIds.listTable.pageInfo).should('be.exist')
      cy.findAllByTestId(this.testIds.pager).should('be.exist')
    })
  })
})
