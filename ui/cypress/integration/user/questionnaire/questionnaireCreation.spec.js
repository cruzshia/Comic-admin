/// <reference types="cypress" />

context('Questionnaire Creation', () => {
  const targetRoute = '#/user/questionnaire/creation'

  beforeEach(function() {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .click()

    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('アンケートを登録')
      .click()
      .url()
      .should('contain', targetRoute)
  })

  it('Renders selected sidebar tab style', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.questionnaire.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'アンケート登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.questionnaire.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/questionnaire')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .first()
      .should('have.text', '登録')
      .next()
      .should('have.text', 'スマホ用プレビュー')
      .next()
      .should('have.text', 'PC用プレビュー')
  })

  it('Renders correct create form', function() {
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
            expect($item.find(LABEL_SELECTOR)).have.text('アンケートID')
            expect($item.find(CONTENT_SELECTOR)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アンケート名')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アンケート種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ（ID）')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.search}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('回答後付与されるコイン枚数')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('外部アンケートフォームURL')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('バナーURL')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('説明タイトル')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('説明')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('フッター')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('回答完了メッセージ')
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
            expect($item.find(LABEL_SELECTOR)).have.text('回答期間開始日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('回答期間終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '質問設定')
        cy.findByTestId(this.testIds.dataTable.row).should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('質問')
        })
      })
  })
})
