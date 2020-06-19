/// <reference types="cypress" />

context('Work Detail', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })
  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('作品管理')
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(1)
      .click()
      .invoke('text')
      .as('workId')
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('contain', `/#/comics/work/detail/${this.workId}`)
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('作品管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '作品を編集')
    cy.findByTestId(this.testIds.breadcrumbs).should('have.text', `${this.headerTabs.comic}>作品一覧>作品詳細`)
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/work')

    cy.findByTestId(this.testIds.breadcrumbLink)
      .should('have.attr', 'href', '#/comics/work')
      .click()
      .then(function() {
        cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', '作品一覧')
      })
  })

  it('Renders correct detail form', function() {
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
            expect($item.find(LABEL_SELECTOR)).have.text('作品ID')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品名')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品名（カナ）')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('説明')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('著者')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品種別')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('還元の有無')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
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
            expect($item.find(CONTENT_SELECTOR)).to.be.dateTimeFormat()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(CONTENT_SELECTOR)).to.be.dateTimeFormat()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '話作品情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品種別')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新頻度')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料連載掲載曜日')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('連載誌')
            expect($item.find(CONTENT_SELECTOR)).to.be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像1')
            expect($item.find(`${CONTENT_SELECTOR} img`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像2')
            expect($item.find(`${CONTENT_SELECTOR} img`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像3')
            expect($item.find(`${CONTENT_SELECTOR} img`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像4')
            expect($item.find(`${CONTENT_SELECTOR} img`)).to.be.exist
          })
      })

    /* TODO: test with api response
    cy.get('@dataTable')
      .eq(3)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '広告設定')
        cy.findAllByTestId(this.testIds.dataTable.subtitle)
          .should($item => {
            expect($item.eq(0)).have.text('デバイス種別')
            expect($item.eq(1)).have.text('コンテンツ')
          })
          .siblings(`[data-testid=${this.testIds.dataTable.row}]`)
          .should($item => {
            expect($item.eq(0)).to.be.adTable()
            expect($item.eq(1)).to.be.adTable({ adType: 'admob' })
            expect($item.eq(2)).to.be.adTable({ adType: 'map' })
            expect($item.eq(3)).to.be.adTable()
          })
      })
      */

    cy.findAllByTestId(this.testIds.dataTable.button)
      .first()
      .click()
      .url()
      .should('contain', `/#/comics/work/edit/${this.workId}`)
      .go(-1)

    cy.findAllByTestId(this.testIds.dataTable.button)
      .eq(1)
      .click()
      .url()
      .should('contain', `/#/comics/work/edit/${this.workId}?to=delivery`)
      .go(-1)

    cy.findAllByTestId(this.testIds.dataTable.button)
      .eq(2)
      .click()
      .url()
      .should('contain', `/#/comics/work/edit/${this.workId}?to=episodeInfo`)
      .go(-1)

    /* TODO: test with api response
    cy.findAllByTestId(this.testIds.dataTable.button)
      .eq(3)
      .click()
      .url()
      .should('contain', `/#/comics/work/edit/${this.workId}?to=adSetting`)
      .go(-1)
      */
  })
})
