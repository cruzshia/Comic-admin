/// <reference types="cypress" />

context('Coin Product Detail', () => {
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
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(2)
      .click()
      .invoke('text')
      .as('productId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/application/coin_product/detail/${this.productId}`)
      })
  })
  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title,breadcrumb and button', function() {
    const pageTitle = 'コインプロダクト詳細'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.coinProduct.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/coin_product')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'コインプロダクトを編集')
  })

  it('Renders correct detail table', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('プロダクトID')
            expect($item.find(`${CONTENT_SELECTOR}`)).to.have.text(this.productId)
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入コイン')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入お得コイン')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ステータス')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作成日時')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新日時')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '公開期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).to.not.empty
          })
      })
  })
})
