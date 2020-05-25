/// <reference types="cypress" />

context('Coin Delivery Event Detail', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/application/coin_delivery_event/detail/[\\w|\_]`))
  })

  it('Renders selected style when click coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コイン付与イベント詳細'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.coinDeliveryEvent.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/coin_delivery_event')
  })

  it('Shows correct content header button', function() {
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .should('have.lengthOf', 2)
      .first()
      .should('have.text', 'コイン付与イベントを編集')
      .next()
      .should('have.text', '複製する')
  })

  it('Show correctly creation Info', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`
    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('ID')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベントID')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント名')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント種別')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント報酬設定')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('作成日時')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('更新日時')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '公開期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($row.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })
  })
})
