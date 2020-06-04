/// <reference types="cypress" />

context('Notification Creation', () => {
  const targetRoute = '/#/user/notification/creation'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('tabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.tabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.notification.management)
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.notification.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'お知らせ登録'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.user}>${this.tabs.notification.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/notification')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .first()
      .should('have.text', '登録')
      .next()
      .should('have.text', 'プレビュー')
  })

  it('Show form correctly ', function() {
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
            expect($row.find(CONTENT_SELECTOR)).to.have.text('')
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('アプリ')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).be.exist
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '配信期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('配信開始日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.have.timePlaceholder()
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.have.timePlaceholder()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '内容詳細')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('お知らせカテゴリ')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('重要フラグ')
            expect($row.find(CONTENT_SELECTOR)).to.have.text('重要なイベント')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.checkbox}]`)).to.exist
          })
          .as('checkboxRow')
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('タイトル')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('本文')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`).text()).not.be.empty
          })
        cy.get('@checkboxRow')
          .find(`[data-testid=${this.testIds.inputs.checkbox}]`)
          .click()
          .should('have.class', 'Mui-checked')
      })
  })
})
