/// <reference types="cypress" />

context('Content Detail Page ', () => {
  before(() => {
    cy.wrap('/#/').as('targetRoute')
  })

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab and table row route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.comic)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('コンテンツ管理')
      .click()
    cy.findAllByTestId(this.testIds.listTable.id)
      .findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .findAllByTestId(this.testIds.listTable.tableRowCell)
      .eq(1)
      .click()
      .invoke('text')
      .as('contentId')
      .then(() => cy.url().should('include', `comics/content/detail/${this.contentId}`))
      .as('targetRoute')
  })

  it('Renders selected style when click content tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains('コンテンツ管理')
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('be.exist')
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.comic}>コンテンツ一覧>コンテンツ詳細`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/content')
    cy.findByTestId(this.testIds.contentHeaderButtons).should('have.text', 'コンテンツを編集')
  })

  it('Render correct detail page', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツID')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ名')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ名（カナ）')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ種別')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('説明')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('著者')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品ID')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コイン価格')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('冒頭広告URL')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('並換コード')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('期間限定無料')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話数')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('サムネイル画像')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('冒頭広告画像')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('要求コンテンツID')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('要求コンテンツ名')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作成日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '配信期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
        /*
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('有償コインのみ開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('有償コインのみ終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          */
      })

    /*
    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '無料PPV期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間1 開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間1 終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間2 開始日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間2 終了日時')
            expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(3)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '広告設定')
        cy.findAllByTestId(this.testIds.dataTable.id)
          .first()
          .children()
          .first()
          .should('have.text', 'デバイス種別')
          .next()
          .should('be.adTable', { adType: 'original' })
          .next()
          .should('have.text', 'コンテンツ')
          .next()
          .should('be.adTable', { adType: 'admob' })
          .next()
          .should('be.adTable', { adType: 'map' })
          .next()
          .should('be.adTable', { adType: 'original' })
      })

    function magazineAssertion() {
      cy.findAllByTestId(this.testIds.dataTable.label)
        .first()
        .should('contain', '雑誌バナー設定')
      cy.findAllByTestId(this.testIds.dataTable.content)
        .findAllByTestId(this.testIds.dataTable.id)
        .first()
        .within(function() {
          cy.findAllByTestId(this.testIds.dataTable.row)
            .first()
            .should(function($item) {
              expect($item.find(LABEL_SELECTOR)).have.text('表示条件')
              expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
            })
            .next()
            .should(function($item) {
              expect($item.find(LABEL_SELECTOR)).have.text('画像')
              expect($item.find(`${CONTENT_SELECTOR} img`)).be.exist
            })
            .next()
            .should(function($item) {
              expect($item.find(LABEL_SELECTOR)).have.text('遷移先URL')
              expect($item.find(`${CONTENT_SELECTOR}`)).be.not.empty
            })
        })
    }

    cy.get('@dataTable')
      .eq(6)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '雑誌バナー設定')
        cy.findAllByTestId(this.testIds.dataTable.id)
          .first()
          .children()
          .as('magazineRow')
          .first()
          .should('have.text', 'デバイス共通')
        cy.get('@magazineRow')
          .eq(1)
          .then(function($item) {
            cy.wrap($item).within(magazineAssertion)
          })
        cy.get('@magazineRow')
          .eq(2)
          .then(function($item) {
            cy.wrap($item).within(magazineAssertion)
          })
        cy.get('@magazineRow')
          .eq(3)
          .then(function($item) {
            cy.wrap($item).within(magazineAssertion)
          })
      })
      */
  })
})
