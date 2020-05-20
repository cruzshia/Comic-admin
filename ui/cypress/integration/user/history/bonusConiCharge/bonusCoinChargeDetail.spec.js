/// <reference types="cypress" />

context('Bonus coin charge detail', () => {
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
          .contains('ボーナスコインチャージ履歴')
          .siblings()
          .children('a')
          .click()
        cy.findAllByTestId(this.testIds.listTable.tableRow)
          .first()
          .click()
          .url()
          .should('match', new RegExp(`user/list/history/${this.userId}/bonus_coin_charge/[A-Za-z0-9]+`))
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
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>ユーザー詳細>ボーナスコインチャージ履歴一覧>ボーナスコインチャージ履歴詳細`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 3)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
        expect($links.eq(2)).have.attr('href', `#/user/list/history/${this.userId}/bonus_coin_charge`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', 'ボーナスコインチャージ履歴')
  })

  it('Renders correct dataTable ', function() {
    const rowNum = 11
    const rowLabels = [
      '作成日時',
      '更新日時',
      'ユーザーID',
      'コンテンツキャンペーンID',
      'カスタムイベントID',
      'カスタムイベント報酬ID',
      '履歴種別',
      'アプリID',
      'ボーナスコイン数',
      '広告コイン数',
      '動画広告コイン数'
    ]
    cy.findAllByTestId(this.testIds.dataTable.title).should('contain', '基本情報')
    cy.findAllByTestId(this.testIds.dataTable.id)
      .findAllByTestId(this.testIds.dataTable.row)
      .should('have.length', rowNum)
      .each(($row, idx) => {
        cy.wrap($row).should('contain', rowLabels[idx])
      })
  })
})
