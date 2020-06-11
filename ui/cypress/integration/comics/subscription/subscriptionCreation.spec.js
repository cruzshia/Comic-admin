/// <reference types="cypress" />

context('Subscription Creation', () => {
  const targetRoute = '/#/comics/subscription/creation'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.subscription.management)
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .contains('定期購読を登録')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click subscription tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.subscription.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '定期購読登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.headerTabs.comic}>${this.headerTabs.subscription.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/subscription')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
  it('Show correctly creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('ID')
            expect($row.find(CONTENT_SELECTOR).text()).be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('定期購読名')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .as('deviceTypeRow')
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('定期購読画像')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).have.timePlaceholder()
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).have.timePlaceholder()
          })
      })
  })
})