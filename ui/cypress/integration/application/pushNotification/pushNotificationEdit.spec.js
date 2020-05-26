/// <reference types="cypress" />

context('PushNotification Edit', () => {
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
      .contains(this.headerTabs.pushNotification.list)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp('/#/application/push_notification/edit/\\d+'))
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.pushNotification.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'プッシュ通知編集'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.pushNotification.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/push_notification')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
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
            expect($item.find(LABEL_SELECTOR)).have.text('ID')
            expect($item.find(`${CONTENT_SELECTOR}`).text()).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('タイトル')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`)).to.not.have.value(
              ''
            )
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('メッセージ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}] textarea`)).be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ディープリンクURL')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`)).be.exist
          })
          .next()
          .within(function() {
            cy.findByTestId(this.testIds.dataTable.label).should('have.text', '大アイコン URL')

            cy.findAllByTestId(this.testIds.button.normal)
              .should('have.text', 'プレビュー')
              .click()

            cy.findAllByTestId(this.testIds.inputs.text)
              .find('input')
              .invoke('val')
              .as('url')
              .then(function() {
                cy.get('img').should('have.attr', 'src', this.url)
              })
          })

        cy.get('@dataTable')
          .eq(1)
          .within(function() {
            cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'スケジュール')
            cy.findByTestId(this.testIds.dataTable.row).should(function($item) {
              expect($item.find(LABEL_SELECTOR)).have.text('配信日時')
              expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
            })
          })
      })
  })
})
