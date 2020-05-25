/// <reference types="cypress" />

context('CoinDeliveryEventEdit', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
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
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('コイン付与イベントを編集')
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/application/coin_delivery_event/edit/[\\w|\-]`))
  })

  it('Renders selected style when click coin delivery event tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.coinDeliveryEvent.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コイン付与イベント編集'
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.application}>${this.headerTabs.coinDeliveryEvent.list}>${pageTitle}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/application/coin_delivery_event')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', '登録')
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
            expect($row.find(LABEL_SELECTOR)).have.text('イベントID')
            expect($row.find(CONTENT_SELECTOR).text()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('イベント名')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()).not.be.empty
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
                cy.wrap($tr).within(() => {
                  cy.findAllByTestId(this.testIds.rewardTable.contentCell)
                    .first()
                    .should('have.descendants', `div[data-testid=${this.testIds.inputs.text}]`)
                    .next()
                    .should('have.descendants', `div[data-testid=${this.testIds.inputs.select}]`)
                    .next()
                    .should('have.descendants', `div[data-testid=${this.testIds.inputs.text}]`)
                    .next()
                    .should('have.descendants', `div[data-testid=${this.testIds.inputs.select}]`)
                })
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
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()).not.be.empty
          })
          .next()
          .should($row => {
            expect($row.find(LABEL_SELECTOR)).have.text('公開終了日時')
            expect($row.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}] input`).val()).not.be.empty
          })
      })
  })
})
