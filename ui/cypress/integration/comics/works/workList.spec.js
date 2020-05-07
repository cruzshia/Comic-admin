/// <reference types="cypress" />

context('WorkList', () => {
  const targetRoute = '/#/comics/work'
  beforeEach(() => {
    cy.visit(targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains(this.headerTabs.comic)
      .click()
    cy.url().should('include', targetRoute)
  })

  it('Renders selected style when click work tab in sidebar', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('作品管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '作品一覧'
    cy.findByTestId('content-header-title').should('contain', pageTitle)
    cy.findByTestId('breadcrumbs').should('contain', `${this.headerTabs.comic}>${pageTitle}`)
  })

  it('Shows correct content header button', () => {
    cy.findAllByTestId('content-header-buttons')
      .children('button')
      .then($buttons => {
        $buttons.each((_, $button) => expect($button.innerText).oneOf(['CSV登録ログ', 'CSV登録', '作品を登録']))
      })
  })

  it('Renders correct search form', () => {
    cy.findByTestId('search_filter').should('be.exist')
    cy.findByTestId('search-filter-items-left').as('filterLeft')
    cy.findByTestId('search-filter-items-right').as('filterRight')

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .first()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('作品（ID）')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .eq(1)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('著者')
        cy.get('@searchItem')
          .findByTestId('search_input')
          .should('be.exist')
      })

    cy.get('@filterLeft')
      .findAllByTestId('search_filter_item')
      .last()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('作品種別')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .first()
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('連載状態')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .eq(1)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('連載誌名')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.get('@filterRight')
      .findAllByTestId('search_filter_item')
      .eq(2)
      .then($item => {
        cy.wrap($item).as('searchItem')
        cy.get('@searchItem')
          .findByTestId('search-filter-item-label')
          .contains('連載頻度')
        cy.get('@searchItem')
          .findByTestId('select')
          .should('be.exist')
      })

    cy.findByTestId('search_filter_expand')
      .click()
      .then(() => {
        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .first()
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('作品（ID）')
            cy.get('@searchItem')
              .findByTestId('search_input')
              .should('be.exist')
          })

        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .eq(1)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('著者')
            cy.get('@searchItem')
              .findByTestId('search_input')
              .should('be.exist')
          })

        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .eq(2)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('作品種別')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .eq(3)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('配信開始日時')
            cy.get('@searchItem')
              .findByTestId('time_span_input')
              .should('be.exist')
          })

        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .eq(4)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('配信終了日時')
            cy.get('@searchItem')
              .findByTestId('time_span_input')
              .should('be.exist')
          })

        cy.get('@filterLeft')
          .findAllByTestId('search_filter_item')
          .eq(5)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('広告ユニット')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .first()
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('連載状態')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .eq(1)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('連載誌名')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .eq(2)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('連載頻度')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .eq(3)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('連載曜日')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })

        cy.get('@filterRight')
          .findAllByTestId('search_filter_item')
          .eq(4)
          .then($item => {
            cy.wrap($item).as('searchItem')
            cy.get('@searchItem')
              .findByTestId('search-filter-item-label')
              .contains('定期購読ID')
            cy.get('@searchItem')
              .findByTestId('select')
              .should('be.exist')
          })
      })

    cy.viewport(1180, 660).then(() => {
      cy.findByTestId('search-filter-items-left').then($domLeft => {
        cy.findByTestId('search-filter-items-right').then($domRight => {
          expect($domRight.offset().top).greaterThan($domLeft.offset().top)
          expect($domRight.offset().left).equals($domLeft.offset().left)
        })
      })
    })

    cy.viewport(1181, 660).then(() => {
      cy.wait(500)
      cy.findByTestId('search-filter-items-left').then($domLeft => {
        cy.findByTestId('search-filter-items-right').then($domRight => {
          expect($domRight.offset().top).equals($domLeft.offset().top)
          expect($domRight.offset().left).greaterThan($domLeft.offset().left)
        })
      })
    })
  })

  it('Renders correct search button', () => {
    cy.findByTestId('search-filter-buttons')
      .children('button')
      .should('be.rightSearchBtn')
  })

  it('Renders correct list table', () => {
    const tableColNum = 8

    cy.findByTestId('list-table')
      .as('listTable')
      .should('be.exist')

    cy.get('@listTable')
      .findByTestId('table-head-row')
      .children('th')
      .should('have.lengthOf', tableColNum)
      .first()
      .should('have.text', '画像')
      .next()
      .should('have.text', '作品ID')
      .next()
      .should('have.text', '作品タイトル')
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
      .findAllByTestId('list-table-row')
      .findAllByTestId('list-table-row-cell')
      .should('have.lengthOf', tableColNum)
  })

  it('Renders correct list table button and pagination information', () => {
    cy.findByTestId('list-table-button')
      .children('button')
      .should('contain', 'CSV出力')
    cy.findByTestId('list-table-pagination').should('be.exist')
  })

  it('Renders pagination', () => {
    cy.findByTestId('pagination').should('be.exist')
  })
})
