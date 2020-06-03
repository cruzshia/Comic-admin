/// <reference types="cypress" />

context('Content Creation page', () => {
  const targetRoute = '/#/comics/content/creation'
  const sidebarTab = 'コンテンツ管理'

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
      .contains(sidebarTab)
      .click()
    cy.findAllByTestId(this.testIds.button.normal)
      .contains('コンテンツを登録')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Renders selected style when click content tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(sidebarTab)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = 'コンテンツ登録'

    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.comic}>コンテンツ一覧>${pageTitle}`)
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/content')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })

  it('Renders correct creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ名')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ名（カナ）')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コンテンツ種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('説明')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('著者')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.search}]`)).to.be.exist
            expect($item.find(`[data-testid=${this.testIds.button.normal}]`).eq(0)).have.text('著者新規登録')
            expect($item.find(`[data-testid=${this.testIds.button.normal}]`).eq(1)).have.text('著者を追加')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('アプリID')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品ID')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.textArea}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コイン価格')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('冒頭広告URL')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('並換コード')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('期間限定無料')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.checkbox}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話数')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('サムネイル画像')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('冒頭広告画像')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('要求コンテンツ（ID）')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.search}]`)).to.be.exist
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
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('有償コインのみ開始日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('有償コインのみ終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '無料PPV期間')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間1 開始日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間1 終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間2 開始日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('無料PPV期間2 終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
          })
      })

    cy.get('@dataTable')
      .eq(3)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '広告設定')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('デバイス種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('広告設定')
          })
          .findAllByTestId(this.testIds.inputBlock.block)
          .as('blocks')
          .should(function($blocks) {
            expect($blocks).to.have.length(5)
            expect($blocks.eq(0)).to.be.advertisement({ isOriginal: true })
            expect($blocks.eq(1)).to.be.advertisement()
            expect($blocks.eq(2)).to.be.advertisement()
            expect($blocks.eq(3)).to.be.advertisement({ isOriginal: true })
            expect($blocks.eq(4)).to.be.advertisement()
          })
          .findAllByTestId('arrow-icon')
          .should('have.length', 5)
          .findByTestId(this.testIds.contentLabel)
          .should('have.text', 'コンテンツ')
          .findAllByTestId(this.testIds.button.normal)
          .last()
          .should('have.text', '広告設定を追加する')
      })

    cy.get('@dataTable')
      .eq(4)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '雑誌バナー設定')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('デバイス種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.shortInput()
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('雑誌バナー設定1')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('雑誌バナー設定2')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('雑誌バナー設定3')
          })
      })
  })
})
