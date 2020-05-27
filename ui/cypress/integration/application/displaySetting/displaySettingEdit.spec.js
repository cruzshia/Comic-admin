/// <reference types="cypress" />

context('DisplaySetting Edit', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('tabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.tabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.displaySetting.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()

    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .click()
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/application/display_setting/edit/\\d+`))
      })
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.displaySetting.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アプリ画面設定編集'

    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.application}>${this.tabs.displaySetting.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/display_setting')
    cy.findByTestId(this.testIds.contentHeaderButtons).within(() => {
      cy.findAllByTestId(this.testIds.button.normal)
        .first()
        .should('have.text', '登録')
        .next()
        .should('have.text', 'プレビュー')
        .next()
        .should('have.text', '複製する')
    })
  })

  it('Renders correct edit form', function() {
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
            expect(
              $item.find(`${CONTENT_SELECTOR}  [data-testid=${this.testIds.inputs.select}] input`).val()
            ).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('補足')
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
            expect($item.find(`${CONTENT_SELECTOR} input`).val()).be.dateTimeFormat({ asText: true })
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(`${CONTENT_SELECTOR} input`).val()).be.dateTimeFormat({ asText: true })
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
