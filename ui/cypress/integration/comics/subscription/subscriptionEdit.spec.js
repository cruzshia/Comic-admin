/// <reference types="cypress" />
context('Subscription Edit', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

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
      .contains(this.headerTabs.subscription.management)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .eq(1)
      .click()
      .invoke('text')
      .as('subscriptionId')
      .then(() =>
        cy
          .findByTestId(this.testIds.contentHeaderButtons)
          .click()
          .url()
          .as('targetRoute')
          .should('include', `/#/comics/subscription/edit/${this.subscriptionId}`)
      )
  })

  it('Renders selected style when click subscription tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.subscription.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '定期購読編集'
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
  it('Show correct edit form', function() {
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
            expect($row.find(CONTENT_SELECTOR).text()).to.be.equal(this.subscriptionId)
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('定期購読名')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('定期購読画像')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}] img`).attr('src')).not.be
              .empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect(
              $row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()
            ).have.dateTimeFormat({ asText: true })
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect(
              $row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()
            ).have.dateTimeFormat({ asText: true })
          })
      })
  })
})
