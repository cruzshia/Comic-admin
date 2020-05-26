context('PushNotification Creation', () => {
  const targetRoute = '/#/application/push_notification/creation'

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
      .contains(this.headerTabs.pushNotification.list)
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .contains('プッシュ通知を登録')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.pushNotification.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'プッシュ通知登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.pushNotification.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/push_notification')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '登録')
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
            expect($item.find(LABEL_SELECTOR)).have.text('ID')
            expect($item.find(`${CONTENT_SELECTOR}`)).to.be.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('タイトル')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('メッセージ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリ')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ディープリンクURL')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .within(function() {
            const url = 'https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088822525/1200/9784088822525.jpg'
            const inputSelector = `${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`
            cy.get(LABEL_SELECTOR).should('have.text', '大アイコン URL')
            cy.get(inputSelector)
              .should('be.exist')
              .type(url, { delay: 1 })

            cy.get(`${CONTENT_SELECTOR} [data-testid=${this.testIds.button.normal}]`)
              .should('have.text', 'プレビュー')
              .click()
            cy.get('img').should('have.attr', 'src', url)
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'スケジュール')
        cy.findByTestId(this.testIds.dataTable.row).should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('配信日時')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.have.timePlaceholder()
        })
      })
  })
})
