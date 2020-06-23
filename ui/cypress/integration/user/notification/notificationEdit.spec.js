/// <reference types="cypress" />

context('NotificationEdit', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

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
      .contains(this.headerTabs.notification.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('notificationId')
      .then(() => {
        cy.findByTestId(this.testIds.contentHeaderButtons)
          .children('button:nth-child(1)')
          .click()
          .url()
          .as('targetRoute')
          .should('have.contain', `/user/notification/edit/${this.notificationId}`)
      })
  })

  it('Renders selected style when click coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.notification.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'お知らせ編集'
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.notification.list}>${pageTitle}`
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
            expect($item.find(LABEL_SELECTOR)).to.have.text('ID')
            expect($item.find(CONTENT_SELECTOR).text()).to.be.equal(this.notificationId)
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('アプリ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '配信期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('配信開始日時')
            expect($item.find(`${CONTENT_SELECTOR} input`).val()).have.dateTimeFormat({ asText: true })
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('配信終了日時')
            expect($item.find(`${CONTENT_SELECTOR} input`).val()).have.dateTimeFormat({ asText: true })
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '内容詳細')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('お知らせカテゴリ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('重要フラグ')
            expect($item.find(CONTENT_SELECTOR).text()).is.equal('重要なイベント')
            expect($item.find(`${CONTENT_SELECTOR} input[type=checkbox]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('タイトル')
            expect($item.find(`${CONTENT_SELECTOR} input`).val()).not.be.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).to.have.text('本文')
            expect($item.find(`${CONTENT_SELECTOR} textarea`).val()).not.be.empty
          })
      })
  })
})
