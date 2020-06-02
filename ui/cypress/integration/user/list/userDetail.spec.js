/// <reference types="cypress" />

context('User List Detail', () => {
  before(() => cy.wrap('/#/').as('targetRoute'))

  beforeEach(function() {
    cy.visit(this.targetRoute)
    cy.fixture('headerTabs.json').as('headerTabs')
    cy.fixture('testIds.json').as('testIds')
  })

  it('Click tab route correctly', function() {
    cy.visit('/')
    cy.findAllByTestId(this.testIds.headerTab)
      .contains(this.headerTabs.user)
      .click()
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.management)
      .click()
    cy.findAllByTestId(this.testIds.listTable.tableRow)
      .first()
      .click()
      .url()
      .as('targetRoute')
      .should('match', new RegExp(`#/user/list/detail/[\\w\]`))
  })

  it('Renders selected style when click user list tab in sidebar', function() {
    cy.findAllByTestId(this.testIds.sidebarTab)
      .contains(this.headerTabs.userList.management)
      .parent()
      .should('be.sideTabSelected')
  })

  it('Shows correct page title and breadcrumb', function() {
    cy.findByTestId(this.testIds.contentHeaderTitle).should('have.text', this.headerTabs.userList.detail)
    cy.findByTestId(this.testIds.breadcrumbs).should(
      'have.text',
      `${this.headerTabs.user}>${this.headerTabs.userList.list}>${this.headerTabs.userList.detail}`
    )
    cy.findByTestId(this.testIds.breadcrumbLink).should('have.attr', 'href', '#/user/list')
  })

  it('Renders correct detail form', function() {
    const LABEL_SELECTOR = `[data-testid=${this.testIds.dataTable.label}]`
    const CONTENT_SELECTOR = `[data-testid=${this.testIds.dataTable.content}]`
    const BUTTON_SELECTOR = `[data-testid=${this.testIds.button.normal}]`

    function selectAssertion(label) {
      cy.findByTestId(this.testIds.dataTable.label).should('have.text', label)
      cy.findByTestId(this.testIds.dataTable.content)
        .findByTestId(this.testIds.inputs.select)
        .should('be.exist')
      cy.findByTestId(this.testIds.dataTable.content)
        .findByTestId(this.testIds.button.normal)
        .should('have.text', '変更')
    }

    function coinContentAssertion(label) {
      cy.findByTestId(this.testIds.dataTable.label).should('have.text', label)
      cy.findByTestId(this.testIds.dataTable.content)
        .findByTestId(this.testIds.inputs.amount)
        .children('input[type=number]')
        .should('have.attr', 'placeholder', '贈答枚数を入力')
      cy.findByTestId(this.testIds.button.normal).should('have.text', '贈答/没収')
    }

    cy.findAllByTestId(this.testIds.dataTable.container)
      .as('dataTable')
      .first()
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '基本情報')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .should('have.lengthOf', 12)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ID')
            expect($item.find(CONTENT_SELECTOR)).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ニックネーム')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('メールアドレス')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('生年月')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('性別')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('お気に入り')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('最終ログイン日時')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('パスワードハッシュ')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ログイン失敗回数')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ログインロック日時')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('作成日時')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('更新日時')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(1)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '退会フラグ')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .as('unsubscribeRow')
          .should('have.lengthOf', 2)
          .first()
          .within(function() {
            selectAssertion.call(this, 'ステータス')
          })
        cy.get('@unsubscribeRow')
          .eq(1)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('退会日時')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(2)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'コイン残高（iOS）')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .as('iOSRow')
          .should('have.lengthOf', 6)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@iOSRow')
          .eq(1)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入お得コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@iOSRow')
          .eq(2)
          .within(function() {
            coinContentAssertion.call(this, '贈答用購入コイン数')
          })
        cy.get('@iOSRow')
          .eq(3)
          .within(function() {
            coinContentAssertion.call(this, 'ボーナスコイン')
          })
        cy.get('@iOSRow')
          .eq(4)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('広告コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@iOSRow')
          .eq(5)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('動画広告コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(3)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'コイン残高（Android）')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .as('AndroidRow')
          .should('have.lengthOf', 6)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@AndroidRow')
          .eq(1)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入お得コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@AndroidRow')
          .eq(2)
          .within(function() {
            coinContentAssertion.call(this, '贈答用購入コイン数')
          })
        cy.get('@AndroidRow')
          .eq(3)
          .within(function() {
            coinContentAssertion.call(this, 'ボーナスコイン')
          })
        cy.get('@AndroidRow')
          .eq(4)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('広告コイン')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@AndroidRow')
          .eq(5)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('動画広告コイン数')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(4)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'コメント')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .as('commentRow')
          .should('have.lengthOf', 4)
          .first()
          .within(function() {
            selectAssertion.call(this, 'コメント投稿者種別')
          })
        cy.get('@commentRow')
          .eq(1)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コメント件数')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
        cy.get('@commentRow')
          .eq(2)
          .within(function() {
            selectAssertion.call(this, 'コメント権限')
          })
        cy.get('@commentRow')
          .eq(3)
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('コメント制限終了日時')
            expect(
              $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.text}]`)
            ).to.be.exist.and.have.timePlaceholder()
            expect($item.find(`[data-testid=${this.testIds.inputs.description}]`)).have.text('※未入力の場合は無期限')
          })
      })

    cy.get('@dataTable')
      .eq(5)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', '購入履歴')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .should('have.lengthOf', 5)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('話購入履歴')
            expect($item.find(CONTENT_SELECTOR)).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('定期購読履歴')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('雑誌/コミックス購入履歴')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('ボーナスコインチャージ履歴')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('購入コインチャージ履歴')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
          })
      })

    cy.get('@dataTable')
      .eq(6)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'デバイス')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .should('have.lengthOf', 2)
          .first()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('デバイス1')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=icon-list]`)).to.be.exist
          })
          .next()
          .should(function($item) {
            expect($item.find(LABEL_SELECTOR)).have.text('デバイス2')
            expect($item.find(CONTENT_SELECTOR).text()).to.not.empty
            expect($item.find(`${CONTENT_SELECTOR} [data-testid=icon-list]`)).to.be.exist
          })
      })

    cy.get('@dataTable')
      .eq(7)
      .within(function() {
        cy.findByTestId(this.testIds.dataTable.title).should('have.text', 'コンテンツ贈答')
        cy.findAllByTestId(this.testIds.dataTable.row)
          .first()
          .as('firstRow')
          .within(function() {
            cy.findAllByTestId(this.testIds.dataTable.row)
              .should('have.lengthOf', 2)
              .first()
              .should(function($item) {
                expect($item.find(LABEL_SELECTOR)).have.text('アプリ')
                expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
              })
              .next()
              .should(function($item) {
                expect($item.find(LABEL_SELECTOR)).have.text('コンテンツID')
                expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.search}]`)).to.be.exist
                expect($item.find(BUTTON_SELECTOR)).have.text('贈答')
              })
          })

        cy.get('@firstRow')
          .siblings(`[data-testid=${this.testIds.dataTable.row}]`)
          .within(function() {
            cy.findAllByTestId(this.testIds.dataTable.row)
              .should('have.lengthOf', 3)
              .first()
              .should(function($item) {
                expect($item.find(LABEL_SELECTOR)).have.text('アプリ')
                expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
              })
              .next()
              .should(function($item) {
                expect($item.find(LABEL_SELECTOR)).have.text('定期購読')
                expect($item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.select}]`)).to.be.exist
              })
              .next()
              .should(function($item) {
                expect($item.find(LABEL_SELECTOR)).have.text('有効期限')
                expect(
                  $item.find(`${CONTENT_SELECTOR} [data-testid=${this.testIds.inputs.dateTime}]`)
                ).to.be.exist.and.have.timePlaceholder()
                expect($item.find(BUTTON_SELECTOR)).have.text('贈答')
              })
          })
      })
  })
})
