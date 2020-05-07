/// <reference types="cypress" />

context('WorkList', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findAllByTestId('header-tab')
      .contains('マンガ管理')
      .click()
  })

  it('Click tab ComicsWork renders right style', () => {
    cy.findAllByTestId('sidebar-tab')
      .contains('作品管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Renders work list page', () => {
    cy.findByTestId('content-header-title').should('contain', '作品一覧')
    cy.findByTestId('breadcrumbs').should('have.text', 'マンガ管理>作品一覧')
    cy.findAllByTestId('content-header-buttons')
      .children('button')
      .then($buttons => {
        $buttons.each((_, $button) => expect($button.innerText).oneOf(['CSV登録ログ', 'CSV登録', '作品を登録']))
      })
    cy.findAllByTestId('search-filter-buttons')
      .children('button')
      .then($buttons => {
        $buttons.each((_, $button) => expect($button.innerText).oneOf(['検索', '内容をリセット']))
      })
    cy.findByTestId('pagination').should('not.be.empty')
  })

  it('Renders work search form', () => {
    const searchFormLabel = {
      left: ['作品（ID）', '著者', '作品種別'],
      right: ['連載状態', '連載誌名', '連載頻度']
    }
    const expandSearchFormLabel = {
      left: searchFormLabel.left.concat(['配信開始日時', '配信終了日時', '広告ユニット']),
      right: searchFormLabel.right.concat(['連載曜日', '定期購読ID'])
    }
    const searchFilterItems = [
      { id: 'search_input', labels: ['作品（ID）', '著者'] },
      {
        id: 'select',
        labels: ['作品種別', '広告ユニット', '連載状態', '連載誌名', '連載頻度', '連載曜日', '定期購読ID']
      },
      { id: 'time_span_input', labels: ['配信開始日時', '配信終了日時'] }
    ]

    cy.findByTestId('search-filter-items-left')
      .findAllByTestId('search-filter-item-label')
      .then($labels => {
        expect($labels).to.have.length(searchFormLabel.left.length)
        $labels.each((idx, $label) => expect($label.innerText).equals(searchFormLabel.left[idx]))
      })

    cy.findByTestId('search-filter-items-right')
      .findAllByTestId('search-filter-item-label')
      .then($labels => {
        expect($labels).to.have.length(searchFormLabel.right.length)
        $labels.each((idx, $label) => expect($label.innerText).equals(searchFormLabel.right[idx]))
      })

    cy.findAllByTestId('search_filter_expand')
      .click()
      .then(() => {
        cy.findByTestId('search-filter-items-left')
          .findAllByTestId('search-filter-item-label')
          .then($labels => {
            expect($labels).to.have.length(expandSearchFormLabel.left.length)
            $labels.each((idx, $label) => expect($label.innerText).equals(expandSearchFormLabel.left[idx]))
          })

        cy.findByTestId('search-filter-items-right')
          .findAllByTestId('search-filter-item-label')
          .then($labels => {
            expect($labels).to.have.length(expandSearchFormLabel.right.length)
            $labels.each((idx, $label) => expect($label.innerText).equals(expandSearchFormLabel.right[idx]))
          })
        searchFilterItems.map(item =>
          cy
            .findAllByTestId(item.id)
            .parent()
            .siblings()
            .then($labels => $labels.each((idx, $label) => expect($label.innerText).equals(item.labels[idx])))
        )
      })

    // Renders correct work search form when window width <= 1180
    // viewportHeight default value is 660
    cy.viewport(1180, 660).then(() => {
      cy.findByTestId('search-filter-items-left').then($domLeft => {
        cy.findByTestId('search-filter-items-right').then($domRight => {
          expect($domRight.offset().top).greaterThan($domLeft.offset().top)
          expect($domRight.offset().left).equals($domLeft.offset().left)
        })
      })
    })

    // Renders correct work search form when window width > 1180
    // viewportHeight default value is 660
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

  it('Renders work list table', () => {
    const tableHeads = ['画像', '作品ID', '作品タイトル', '作成日時', '作品種別', '話作品種別', '更新頻度', '']
    cy.findByTestId('list-table-pagination').should('contain', '全1000件表示（1~100件目を表示）')

    cy.findByTestId('table-head-row')
      .children('th')
      .as('tableHeadCell')
      .then($tableHeads => {
        expect($tableHeads).to.have.length(tableHeads.length)
        $tableHeads.each((idx, $cell) => expect($cell.innerText).eq(tableHeads[idx]))
      })

    cy.get('@tableHeadCell')
      .contains('作成日時')
      .parent()
      .should('be.sortableHeadCell', { sorting: true })

    cy.findAllByTestId('list-table-row')
      .findAllByTestId('list-table-row-cell')
      .should('have.length', tableHeads.length)
  })
})
