/// <reference types="cypress" />

context('Comment Detail', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.comment.list)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/user/comment/detail/[\\w\]`))
  })

  it('Renders selected style when click comment tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.comment.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title, breadcrumb and contentHeaderButtons', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', this.headerTabs.comment.detail)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.comment.list}>${this.headerTabs.comment.detail}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/comment')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', 'コメントを編集')
  })

  it('Renders correct detail table', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
    cy.findAllByTestId(this.testIds.dataTable.row)
      .should('have.length', 11)
      .first()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('ID')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('ユーザーID')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('アプリID')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('コンテンツID')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('コンテンツ名')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('メッセージ')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('ステータス')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('いいね数')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('通報数')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('作成日時')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
      .next()
      .should(function($item) {
        expect($item.find(LABEL_SELECTOR)).to.have.text('更新日時')
        expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
      })
  })
})
