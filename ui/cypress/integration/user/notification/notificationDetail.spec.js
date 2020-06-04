/// <reference types="cypress" />

context('Notification Detail', () => {
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
      .contains(this.tabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.notification.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('notificationId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/user/notification/detail/${this.notificationId}`))
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.notification.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'お知らせ詳細'
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
      .should('have.text', 'お知らせを編集')
      .next()
      .should('have.text', '複製する')
  })

  it('Shows correct detail form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findByTestId(this.testIds.dataTable.button).should('be.exist')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('ID')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('アプリ')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('作成日時')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('更新日時')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
      })
    cy.get('@dataTable')
      .eq(1)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '配信期間')
        cy.findByTestId(this.testIds.dataTable.button).should('be.exist')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('配信開始日時')
            expect($row.find(CONTENT_SELECTOR)).to.be.dateTimeFormat()
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($row.find(CONTENT_SELECTOR)).to.be.dateTimeFormat()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '内容')
        cy.findByTestId(this.testIds.dataTable.button).should('be.exist')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('お知らせカテゴリ')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('重要フラグ')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('タイトル')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('本文')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
      })

    cy.findAllByTestId(this.testIds.dataTable.button)
      .first()
      .click()
      .url()
      .should('have.contain', `/#/user/notification/edit/${this.notificationId}`)
      .go(-1)
    cy.findAllByTestId(this.testIds.dataTable.button)
      .eq(1)
      .click()
      .url()
      .should('have.contain', `/#/user/notification/edit/${this.notificationId}?to=releaseDuration`)
      .go(-1)
    cy.findAllByTestId(this.testIds.dataTable.button)
      .eq(2)
      .click()
      .url()
      .should('have.contain', `/#/user/notification/edit/${this.notificationId}?to=content`)
      .go(-1)
  })
})
