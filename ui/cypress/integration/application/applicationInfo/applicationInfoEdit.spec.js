/// <reference types="cypress" />

context('Application Info Edit', () => {
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
      .contains(this.headerTabs.applicationInfo.list)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(0)
      .click()
      .invoke('text')
      .as('appId')
      .then(() => {
        cy.findByTestId(this.testIds.contentHeaderButtons)
          .children('button')
          .contains('アプリ情報を編集')
          .click()
          .url()
          .should('contain', `/#/application/application_info/edit/${this.appId}`)
          .as('targetRoute')
      })
  })

  it('Renders selected style in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.applicationInfo.list)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title,breadcrumb and button', function() {
    const pageTitle = 'アプリ情報編集'
    cy.findByTestId(this.testIds.breadcrumbs)
      .should('have.text', `${this.headerTabs.application}>${this.headerTabs.applicationInfo.list}>${pageTitle}`)
      .findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/application/application_info')
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '登録')
  })

  it('Renders correct edit form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`
    const BUTTON_SELECTOR = `[data-testid=${this.testIds.button.normal}]`

    cy.findByTestId(this.testIds.dataTable.id)
      .findAllByTestId(this.testIds.dataTable.row)
      .should('have.length', 10)
      .first()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
        expect($item.find(`${CONTENT_SELECTOR}`)).to.be.not.empty
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('アプリ名')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .as('uploadButton')
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('共通鍵')
        expect($item.find(`${CONTENT_SELECTOR} ${BUTTON_SELECTOR}`)).have.text('ファイルを選択')
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('APNs認証キー')
        expect($item.find(`${CONTENT_SELECTOR} ${BUTTON_SELECTOR}`)).have.text('ファイルを選択')
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('APNs Team ID')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('APNs Key ID')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('FCM APIキー')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('Android公開鍵')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('iTunes共有秘密鍵')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(LABEL_SELECTOR)).have.text('アプリ追加設定')
        expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
      })
  })
})
