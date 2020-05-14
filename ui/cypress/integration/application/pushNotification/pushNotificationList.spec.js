/// <reference types="cypress" />

context('Push Notification List', () => {
  const targetRoute = '/#/application/push_notification'
  const pageTitle = 'プッシュ通知ログ一覧'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click push notification tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(pageTitle)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.application}>${pageTitle}`)
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'プッシュ通知ログを登録')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')
    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('メッセージ')
        expect($item.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('配信開始日時')
        expect($item.find(`[data-testid=${this.testIds.inputs.dateTime}]`)).to.have.length(2)
      })

    cy.findByTestId(this.testIds.searchFilter.itemsRight)
      .findByTestId(this.testIds.searchFilter.item)
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('アプリID')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
  })
})
