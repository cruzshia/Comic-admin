/// <reference types="cypress" />

context('Subscription list', () => {
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
          .url()
          .should('include', `user/list/history/${this.userId}/subscription`)
          .as('targetRoute')
      })
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.list)
      .parent()
      .should('be.sideTabSelected')
  })
  it('Renders correct breadcrumbs , pageTitle', function() {
    cy.findAllByTestId(this.testIds.breadcrumbs)
      .should(
        'contain',
        `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}>${pageTitle}`
      )
      .findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 2)
      .should($links => {
        expect($links.eq(0)).have.attr('href', '#/user/list')
        expect($links.eq(1)).have.attr('href', `#/user/list/detail/${this.userId}`)
      })
    cy.findAllByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
  })
})