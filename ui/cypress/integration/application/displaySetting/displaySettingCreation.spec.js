/// <reference types="cypress" />

context('DisplaySetting Creation', () => {
  const targetRoute = '/#/application/display_setting/creation'

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
      .contains(this.headerTabs.displaySetting.management)
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .contains('アプリ画面を登録')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.displaySetting.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アプリ画面設定登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.displaySetting.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/display_setting')
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
            expect($item.find(LABEL_SELECTOR)).have.text('画面')
            expect($item.find(`${CONTENT_SELECTOR}  [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('補足')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '配信期間')

        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).to.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).to.have.timePlaceholder()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '設定')

        cy.findByTestId('data-table-buttons').as('tableButtons')

        cy.findByTestId(this.testIds.dataTable.row).within(function() {
          cy.findByTestId(this.testIds.dataTable.label).should('have.text', '設定')
          cy.findByTestId(this.testIds.dataTable.content)
            .findByTestId(this.testIds.inputs.textArea)
            .should('be.exist')

          cy.get('@tableButtons')
            .children('button')
            .should('have.length', 2)
            .contains('セクション')
            .click()

          cy.findByTestId(this.testIds.dataTable.content)
            .findAllByTestId('tree-item')
            .should('be.exist')
        })
      })
  })
})
