/// <reference types="cypress" />

context('Coin Product Edit', () => {
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
        cy.findByTestId(this.testIds.contentHeaderButtons)
          .children('button')
          .contains('コインプロダクトを編集')
          .click()
          .url()
          .should('contain', `/#/application/coin_product/edit/${this.productId}`)
          .as('targetRoute')
      })
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinProduct.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title,breadcrumb and button', function() {
    const pageTitle = 'コインプロダクト編集'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.coinProduct.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/coin_product')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })

  it('Renders correct creation form', function() {
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
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            const inputBox = `${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`
            expect($item.find(LABEL_SELECTOR)).have.text('有償コイン')
            expect($item.find(inputBox)).to.be.exist
            expect(
              $item
                .find(inputBox)
                .children('input')
                .val()
            ).be.not.empty
          })
          .next()
          .should(function($item) {
            const inputBox = `${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`
            expect($item.find(LABEL_SELECTOR)).have.text('有償お得コイン')
            expect($item.find(inputBox)).to.be.exist
            expect(
              $item
                .find(inputBox)
                .children('input')
                .val()
            ).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ステータス')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '公開期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            const inputBox = `${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`
            expect($item.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect($item.find(inputBox)).to.be.exist
            expect(
              $item
                .find(inputBox)
                .children('input')
                .val()
            ).be.not.empty
          })
          .next()
          .should(function($item) {
            const inputBox = `${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`
            expect($item.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($item.find(inputBox)).to.be.exist
            expect(
              $item
                .find(inputBox)
                .children('input')
                .val()
            ).be.not.empty
          })
      })
  })
})
