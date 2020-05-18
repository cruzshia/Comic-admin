/// <reference types="cypress" />

context('Work import log page', () => {
  const targetRoute = '/#/comics/work/import_logs'
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
      .contains('作品管理')
      .click()
      .parent()
      .should('be.sideTabSelected')
    cy.findAllByTestId(this.testIds.button.normal)
      .contains('CSV登録ログ')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '作品CSV登録ログ'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.comic}>作品一覧>${pageTitle}`)
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/work')
  })

  it('Renders correct log list table', function() {
    const tableColNum = 7
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
      .should('have.text', '作成日時')
      .next()
      .should('have.text', '予約日時')
      .next()
      .should('have.text', '開始日時')
      .next()
      .should('have.text', '更新日時')
      .next()
      .should('have.text', 'ファイル名')
      .next()
      .should('have.text', '状態')
      .next()
      .should('have.text', '詳細')

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
