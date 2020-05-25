/// <reference types="cypress" />

context('Campaign Creation', () => {
  const targetRoute = '/#/comics/campaign/creation'

  beforeEach(() => {
    cy.visit(targetRoute)
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
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'キャンペーン登録'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.tabs.comic}>${this.tabs.campaign.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/campaign')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '登録')
  })

  it('Renders correct creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findByTestId(this.testIds.dataTable.container).within(function() {
      cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
      cy.findAllByTestId(this.testIds.dataTable.row)
        .first()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('キャンペーンID')
          expect($item.find(`${CONTENT_SELECTOR}`)).to.be.empty
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('キャンペーン名')
          expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('管理用コメント')
          expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('開始日時（管理用）')
          expect(
            $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
          ).to.be.exist.have.timePlaceholder()
        })
        .next()
        .should(function($item) {
          expect($item.find(LABEL_SELECTOR)).have.text('終了日時（管理用）')
          expect(
            $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
          ).to.be.exist.and.have.timePlaceholder()
        })
    })
  })
})
