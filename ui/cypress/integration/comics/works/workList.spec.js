/// <reference types="cypress" />

context('WorkList', () => {
  const targetRoute = '/#/comics/work'
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

    cy.viewport(1180, 660).then(() => {
      cy.get('@filterLeft').then($domLeft => {
        cy.get('@filterRight').then($domRight => {
          expect($domRight.offset().top).greaterThan($domLeft.offset().top)
          expect($domRight.offset().left).equals($domLeft.offset().left)
        })
      })
    })

    cy.viewport(1181, 660).then(() => {
      cy.wait(500)
      cy.get('@filterLeft').then($domLeft => {
        cy.get('@filterRight').then($domRight => {
          expect($domRight.offset().top).equals($domLeft.offset().top)
          expect($domRight.offset().left).greaterThan($domLeft.offset().left)
        })
      })
    })
  })

  it('Renders correct search button', function() {
    cy.findByTestId(this.testIds.searchFilter.buttons)
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', function() {
    const tableColNum = 8

    cy.findByTestId(this.testIds.listTable.id)
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId(this.testIds.listTable.tableHead)
      .children('th')
      .should('have.lengthOf', tableColNum)
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

    cy.get('@listTable')
      .findAllByTestId(this.testIds.listTable.tableRow)
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .should('have.lengthOf', tableColNum)
  })

  it('Renders correct list table button and pagination information', function() {
    cy.findByTestId(this.testIds.listTable.button)
      .children('button')
      .should('contain', 'CSV出力')
    cy.findByTestId(this.testIds.listTable.pageInfo).should('be.exist')
  })

  it('Renders pagination', function() {
    cy.findByTestId(this.testIds.pager).should('be.exist')
  })
})
