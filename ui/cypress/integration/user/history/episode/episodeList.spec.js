/// <reference types="cypress" />

context('Episode list', () => {
  const pageTitle = '話購入履歴'
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
          .url()
          .should('include', `user/list/history/${this.userId}/episode`)
          .as('targetRoute')
        cy.findAllByTestId(this.testIds.sidebarTab)
          .contains(this.headerTabs.userList.list)
          .parent()
          .should('be.sideTabSelected')
      })
  })

  it('Renders correct breadcrumbs , pageTitle,buttons', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should(
        'have.text',
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}>話購入履歴一覧`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 2)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
  })

  it('Render correct log table', function() {
    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.findByTestId(this.testIds.listTable.button)
      .children('button')
      .should('contain', 'CSV出力')

    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')
    cy.findByTestId(this.testIds.pager).should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .first()
      .should('have.text', '作成日時')
      .next()
      .should('have.text', 'コンテンツ')
      .next()
      .should('have.text', 'アプリID')
      .next()
      .should('have.text', 'コインの増減数')
      .next()
      .should('have.text', 'コイン種別毎の増減数')
  })
})
