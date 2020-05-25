/// <reference types="cypress" />

context('Coin Delivery Event Creation', () => {
  const targetRoute = '/#/application/coin_delivery_event/creation'

  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.application)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .click()
    cy.findByTestId(this.testIds.contentHeaderButtons)
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コイン付与イベント登録'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'contain',
      `${this.headerTabs.application}>${this.headerTabs.coinDeliveryEvent.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/coin_delivery_event')
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
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント名')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント種別')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).be.exist
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', 'イベント報酬設定')
        cy.findByTestId(this.testIds.dataTable.label).should('have.text', 'イベント報酬')
        const initRowNum = 3
        cy.findByTestId(this.testIds.dataTable.content)
          .children('table')
          .within(() => {
            cy.findByTestId(this.testIds.rewardTable.headerRow)
              .children('th')
              .first()
              .should('have.text', 'リザルトコード')
              .next()
              .should('have.text', '報酬で付与されるコイン')
              .next()
              .should('have.text', '報酬で付与されるコインの枚数')
              .next()
              .should('have.text', '報酬受け取り制限')

            cy.findAllByTestId(this.testIds.rewardTable.contentRow)
              .should('have.length', initRowNum)
              .each($tr => {
                expect($tr.find('td:nth-child(1)').find(`[data-testid=${this.testIds.inputs.text}]`)).be.exist
                expect($tr.find('td:nth-child(2)').find(`[data-testid=${this.testIds.inputs.select}]`)).be.exist
                expect($tr.find('td:nth-child(3)').find(`[data-testid=${this.testIds.inputs.text}]`)).be.exist
                expect($tr.find('td:nth-child(4)').find(`[data-testid=${this.testIds.inputs.select}]`)).be.exist
              })
          })
          .then(() => {
            cy.findByTestId(this.testIds.button.normal)
              .should('have.text', 'イベント報酬を追加する')
              .click()
              .findAllByTestId(this.testIds.rewardTable.contentRow)
              .should('have.length', initRowNum + 1)
          })
      })
    cy.get('@dataTable')
      .eq(2)
      .within(() => {
        cy.findAllByTestId(this.testIds.dataTable.title).should('have.text', '公開期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開開始日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).be.exist
          })
      })
  })
})
