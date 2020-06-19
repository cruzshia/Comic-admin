/// <reference types="cypress" />

import dayjs from 'dayjs'

context('WorkList', () => {
  const targetRoute = '/#/comics/work'
  beforeEach(function() {
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
    cy.fixture('works.json').as('workMsg')

    cy.server()
    cy.capture({
      method: 'GET',
      url: '/v1/works'
    }).as('getWorkList')

    cy.visit(targetRoute)
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.url().should('include', targetRoute)
  })

  it('Renders selected style when click work tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('作品管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '作品一覧'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Shows correct content header button', function() {
    cy.findAllByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .first()
      .should('contain', '作品を登録')
      .next()
      .should('contain', 'CSV登録')
      .next()
      .should('contain', 'CSV登録ログ')
  })

  it('Renders correct search form', function() {
    const ITEM_LABEL_SELECTOR = `[data-testid=${this.testIds.searchFilter.itemLabel}]`
    cy.findByTestId(this.testIds.searchFilter.id).should('be.exist')

    cy.findByTestId(this.testIds.searchFilter.itemsLeft)
      .as('filterLeft')
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('作品名（ID）')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('著者名')
        expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('作品種別')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })

    cy.findByTestId(this.testIds.searchFilter.itemsRight)
      .as('filterRight')
      .findAllByTestId(this.testIds.searchFilter.item)
      .first()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('連載誌')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('更新頻度')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })
      .next()
      .should($item => {
        expect($item.find(ITEM_LABEL_SELECTOR)).have.text('無料連載掲載曜日')
        expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })

    cy.findByTestId(this.testIds.searchFilter.expand)
      .click()
      .then(() => {
        cy.get('@filterLeft')
          .findAllByTestId(this.testIds.searchFilter.item)
          .first()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('作品名（ID）')
            expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('著者名')
            expect($item.find(`[data-testid=${this.testIds.inputs.search}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('作品種別')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('配信開始日時')
            expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .first()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('連載誌')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('更新頻度')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('無料連載掲載曜日')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('定期購読ID')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should($item => {
            expect($item.find(ITEM_LABEL_SELECTOR)).have.text('広告ユニット')
            expect($item.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
      })

    cy.findByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')

    cy.findAllByTestId(this.testIds.searchFilter.itemLabel)
      .contains('作品種別')
      .siblings()
      .findByRole('button')
      .trigger('mousedown', { bubbles: true, cancelable: false, button: 0 })
      .then(function() {
        const targetType = this.workMsg['type_comic']
        cy.findAllByTestId('select-option')
          .contains(targetType)
          .click()

        cy.capture({
          method: 'GET',
          url: '/v1/works'
        }).as('searchWork')

        cy.findByTestId(this.testIds.searchFilter.buttons)
          .contains('検索')
          .click()

        cy.wait('@searchWork').then(function(r) {
          cy.findByTestId(this.testIds.listTable.id)
            .findAllByTestId(this.testIds.listTable.tableRow)
            .each(function($row) {
              cy.wrap($row)
                .findAllByTestId(this.testIds.listTable.tableRowCell)
                .contains(targetType)
                .should('be.exist')
            })
        })
      })
  })

  it('Renders correct list table', function() {
    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.findByTestId(this.testIds.listTable.button)
      .children('button')
      .should('have.text', 'CSV出力')

    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')
    cy.findByTestId(this.testIds.pager).should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .first()
      .should('have.text', '画像')
      .next()
      .should('have.text', '作品ID')
      .next()
      .should('have.text', '作品名')
      .next()
      .should('have.text', '作成日時')
      .and('be.sortableHeadCell', true)
      .next()
      .should('have.text', '作品種別')
      .next()
      .should('have.text', '話作品種別')
      .next()
      .should('have.text', '更新頻度')

    cy.wait('@getWorkList')
      .its('response')
      .its('body')
      .as('workList')

    function assertWorkData($row, work) {
      cy.wrap($row)
        .findAllByTestId(this.testIds.listTable.tableRowCell)
        .eq(1)
        .should('have.text', work.id)
        .next()
        .should('have.text', work.title)
        .next()
        .should('have.text', Cypress.moment(work.inserted_at).format(Cypress.env('timeFormat')))
        .next()
        .should('have.text', this.workMsg[`type_${work.work_type}`])
        .next()
        .should('have.text', this.workMsg[`episode_${work.episode_work_type}`])
        .next()
        .should('have.text', work.update_frequency)
    }

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .each(function($row, index) {
        assertWorkData.call(this, $row, this.workList.works[index])
      })
  })
})
