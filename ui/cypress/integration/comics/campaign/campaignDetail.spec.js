/// <reference types="cypress" />

context('Campaign Detail', () => {
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
      .contains(this.tabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .click()

    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .children('td')
      .eq(0)
      .click()
      .then(() => {
        cy.url()
          .as('targetRoute')
          .should('match', new RegExp(`#/comics/campaign/detail/\\w+`))
      })
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'キャンペーン詳細'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.tabs.comic}>${this.tabs.campaign.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/campaign')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', 'キャンペーンを編集')
  })

  it('Renders correct detail table', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findByTestId(this.testIds.dataTable.container).within(function() {
      cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
      cy.findAllByTestId(this.testIds.dataTable.row)
        .first()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('キャンペーンID')
          expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('キャンペーン名')
          expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('管理用コメント')
          expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('開始日時（管理用）')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.have.dateTimeFormat()
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('終了日時（管理用）')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.have.dateTimeFormat()
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('作成日時')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.have.dateTimeFormat()
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('更新日時')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.have.dateTimeFormat()
        })
    })

    cy.findByTestId(this.testIds.dataTable.button)
      .click()
      .url()
      .should('match', new RegExp(`#/comics/campaign/edit/[\\w|\-]+`))
  })

  it('Renders correct bottom list table', function() {
    const tableColNum = 6
    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.pageInfo)
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', 'キャンペーン種別')
      .next()
      .should('have.text', 'キャンペーン名')
      .next()
      .should('have.text', 'キャンペーン対象')
      .next()
      .should('have.text', '開始日時')
      .next()
      .should('have.text', '終了日時')
      .next()
      .should('be.empty')

    cy.findByTestId(this.testIds.listTable.button)
      .children('button')
      .first()
      .should('have.text', '作品キャンペーンを登録')
      .next()
      .should('have.text', 'コンテンツキャンペーン登録')
    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')
  })
})
