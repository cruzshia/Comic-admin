/// <reference types="cypress" />

context('Author Creation', () => {
  const targetRoute = '#/comics/author/creation'
  beforeEach(function() {
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
      .contains(this.headerTabs.author.management)
      .click()

    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('著者を登録')
      .click()
      .url()
      .should('contain', '/#/comics/author/creation')
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.author.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '著者登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.comic}>${this.headerTabs.author.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/author')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })

  it('Show correctly creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .first()
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('ID')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('著者名')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('著者名（カナ）')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
      })
  })
})
