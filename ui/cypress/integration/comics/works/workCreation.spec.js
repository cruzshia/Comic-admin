/// <reference types="cypress" />

context('Work Creation', () => {
  const targetRoute = '/#/comics/work/creation'
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
      .contains(this.headerTabs.work.management)
      .click()

    cy.findByTestId(this.testIds.contentHeaderButtons)
      .children('button')
      .contains('作品を登録')
      .click()
      .url()
      .should('include', targetRoute)
  })

  it('Shows correct page title and breadcrumb', function() {
    const pageTitle = '作品登録'
    cy.findByTestId(this.testIds.contentHeaderTitle).should('contain', pageTitle)
    cy.findByTestId(this.testIds.breadcrumbs).should('contain', `${this.headerTabs.comic}>作品一覧>${pageTitle}`)
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/comics/work')
  })

  it('Shows correct content header button', function() {
    cy.findByTestId(this.testIds.contentHeaderButtons).should('contain', '登録')
  })

  it('Renders correct creation form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`
    const INPUT_BLOCK_LABEL_SELECTOR = `[data-testid=${this.testIds.inputBlock.label}]`

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作品ID')
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('タイトル')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('タイトル（カナ）')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
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
            expect($item.find(LABEL_SELECTOR)).have.text('作品種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('還元の有無')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読ID')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
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
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('配信終了日時')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '話作品情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品種別')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新頻度')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('連載誌')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像1')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像2')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像3')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像4')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像5')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像6')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話作品画像7')
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.drop}]`)).to.be.exist
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
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('広告設定')
          })
          .findAllByTestId(this.testIds.inputBlock.block)
          .should('have.length', 5)
          .as('inputBlock')
      })

    cy.get('@inputBlock')
      .first()
      .within(function() {
        cy.findAllByTestId(this.testIds.inputBlock.row)
          .first()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('広告の種類')
            expect($block.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('画像URL')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
            expect($block.find(`[data-testid=${this.testIds.button.normal}]`)).have.text('プレビュー')
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('リンクURL')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('ボタン名称')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('配信期間')
            expect($block.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
          })
        cy.findByTestId(this.testIds.imagePreview).should('be.exist')
      })

    cy.get('@inputBlock')
      .eq(1)
      .findByTestId(this.testIds.inputBlock.row)
      .should(function($block) {
        expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('広告の種類')
        expect($block.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })

    cy.get('@inputBlock')
      .eq(2)
      .findByTestId(this.testIds.inputBlock.row)
      .should(function($block) {
        expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('広告の種類')
        expect($block.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
      })

    cy.get('@inputBlock')
      .eq(3)
      .within(function() {
        cy.findAllByTestId(this.testIds.inputBlock.row)
          .first()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('広告の種類')
            expect($block.find(`[data-testid=${this.testIds.inputs.select}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('画像URL')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
            expect($block.find(`[data-testid=${this.testIds.button.normal}]`)).have.text('プレビュー')
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('リンクURL')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('ボタン名称')
            expect($block.find(`[data-testid=${this.testIds.inputs.text}]`)).to.be.exist
          })
          .next()
          .should(function($block) {
            expect($block.find(INPUT_BLOCK_LABEL_SELECTOR)).have.text('配信期間')
            expect($block.find(`[data-testid=${this.testIds.inputs.timeSpan}]`)).to.be.exist
          })
        cy.findByTestId(this.testIds.imagePreview).should('be.exist')
      })

    cy.findByTestId(this.testIds.contentLabel).should('have.text', 'コンテンツ')
    cy.findAllByTestId(this.testIds.button.normal)
      .last()
      .should('have.text', '広告設定を追加する')
  })
})
