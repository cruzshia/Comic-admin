/// <reference types="cypress" />

context('Work Campaign Edit', () => {
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
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .contains('作品キャンペーン')
      .click()

    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/comics/campaign/[\\w|\-]+/work/edit/[\\w|\-]+`))
  })

  it('Renders selected style when click campaign tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.tabs.campaign.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '作品キャンペーン編集'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.tabs.comic}>${this.tabs.campaign.list}>キャンペーン詳細>${pageTitle}`
    )

    cy.findAllByTestId(this.testIds.breadcrumbLink)
      .should('have.length', 2)
      .first()
      .click()
      .url()
      .should('include', '#/comics/campaign')
    cy.go('back')

    cy.findAllByTestId(this.testIds.breadcrumbLink)
      .eq(1)
      .click()
      .url()
      .should('match', new RegExp(`#/comics/campaign/detail/[\\w|\-]+`))
    cy.go('back')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })
})
