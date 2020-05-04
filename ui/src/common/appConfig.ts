const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

export const ANCHOR_QUERY = 'to'

enum RouteSection {
  Comics = '/comics',
  Application = '/application',
  User = '/user'
}

export const routePath = {
  root: '/',
  login: '/login',
  comics: {
    base: RouteSection.Comics,
    work: `${RouteSection.Comics}/work`,
    workCreation: `${RouteSection.Comics}/work/creation`,
    workEdit: `${RouteSection.Comics}/work/edit/:id`,
    workDetail: `${RouteSection.Comics}/work/detail/:id`,
    workExport: `${RouteSection.Comics}/work/export`,
    workImportLogs: `${RouteSection.Comics}/work/import_logs`,
    content: `${RouteSection.Comics}/content`,
    contentCreation: `${RouteSection.Comics}/content/creation`,
    contentEdit: `${RouteSection.Comics}/content/edit/:id`,
    contentDetail: `${RouteSection.Comics}/content/detail/:id`,
    contentImportLogs: `${RouteSection.Comics}/content/import_logs`,
    campaign: `${RouteSection.Comics}/campaign`,
    campaignCreation: `${RouteSection.Comics}/campaign/creation`,
    campaignEdit: `${RouteSection.Comics}/campaign/edit/:id`,
    campaignDetail: `${RouteSection.Comics}/campaign/detail/:id`,
    worksCampaign: `${RouteSection.Comics}/campaign/:campaignId/work`,
    worksCampaignEdit: `${RouteSection.Comics}/campaign/:campaignId/work/edit/:id`,
    worksCampaignDetail: `${RouteSection.Comics}/campaign/:campaignId/work/detail/:id`,
    worksCampaignCreation: `${RouteSection.Comics}/campaign/:campaignId/work/creation`,
    contentsCampaign: `${RouteSection.Comics}/campaign/:campaignId/content`,
    contentsCampaignCreation: `${RouteSection.Comics}/campaign/:campaignId/content/creation`,
    contentsCampaignEdit: `${RouteSection.Comics}/campaign/:campaignId/content/edit/:id`,
    contentsCampaignDetail: `${RouteSection.Comics}/campaign/:campaignId/content/detail/:id`,
    author: `${RouteSection.Comics}/author`,
    authorDetail: `${RouteSection.Comics}/author/detail/:id`,
    authorEdit: `${RouteSection.Comics}/author/edit/:id`,
    authorCreation: `${RouteSection.Comics}/author/creation`,
    subscription: `${RouteSection.Comics}/subscription`,
    subscriptionDetail: `${RouteSection.Comics}/subscription/detail/:id`,
    subscriptionEdit: `${RouteSection.Comics}/subscription/edit/:id`,
    subscriptionCreation: `${RouteSection.Comics}/subscription/creation`
  },
  application: {
    base: RouteSection.Application,
    displaySetting: `${RouteSection.Application}/display_setting`,
    displaySettingEdit: `${RouteSection.Application}/display_setting/edit/:id`,
    displaySettingCreation: `${RouteSection.Application}/display_setting/creation`,
    coinDeliveryEvent: `${RouteSection.Application}/coin_delivery_event`,
    coinDeliveryEventEdit: `${RouteSection.Application}/coin_delivery_event/edit/:id`,
    coinDeliveryEventDetail: `${RouteSection.Application}/coin_delivery_event/detail/:id`,
    coinDeliveryEventCreation: `${RouteSection.Application}/coin_delivery_event/creation`,
    pushNotification: `${RouteSection.Application}/push_notification`,
    pushNotificationEdit: `${RouteSection.Application}/push_notification/edit/:id`,
    pushNotificationDetail: `${RouteSection.Application}/push_notification/detail/:id`,
    pushNotificationCreation: `${RouteSection.Application}/push_notification/creation`,
    coinProduct: `${RouteSection.Application}/coin_product`,
    coinProductEdit: `${RouteSection.Application}/coin_product/edit/:id`,
    coinProductDetail: `${RouteSection.Application}/coin_product/detail/:id`,
    coinProductCreation: `${RouteSection.Application}/coin_product/creation`,
    applicationInfo: `${RouteSection.Application}/application_info`,
    applicationInfoEdit: `${RouteSection.Application}/application_info/edit/:id`,
    applicationInfoDetail: `${RouteSection.Application}/application_info/detail/:id`,
    applicationInfoCreation: `${RouteSection.Application}/application_info/creation`
  },
  user: {
    base: RouteSection.User,
    list: `${RouteSection.User}/list`,
    userDetail: `${RouteSection.User}/list/detail/:id`,
    userEdit: `${RouteSection.User}/list/edit/:id`,
    userExportLogs: `${RouteSection.User}/list/export_logs`,
    comment: `${RouteSection.User}/comment`,
    commentDetail: `${RouteSection.User}/comment/detail/:id`,
    commentEdit: `${RouteSection.User}/comment/edit/:id`,
    ngWord: `${RouteSection.User}/ng_word`,
    giftCoins: `${RouteSection.User}/gift_coins`,
    giftCoinsCreation: `${RouteSection.User}/gift_coins/creation`,
    giftCoinsBatchLogs: `${RouteSection.User}/gift_coins/batch_logs`,
    giftComics: `${RouteSection.User}/gift_comics`,
    giftComicsCreation: `${RouteSection.User}/gift_comics/creation`,
    giftComicsBatchLogs: `${RouteSection.User}/gift_comics/batch_logs`,
    notification: `${RouteSection.User}/notification`,
    notificationDetail: `${RouteSection.User}/notification/detail/:id`,
    notificationEdit: `${RouteSection.User}/notification/edit/:id`,
    notificationCreation: `${RouteSection.User}/notification/creation`,
    questionnaire: `${RouteSection.User}/questionnaire`,
    questionnaireDetail: `${RouteSection.User}/questionnaire/detail/:id`,
    questionnaireEdit: `${RouteSection.User}/questionnaire/edit/:id`,
    questionnaireCreation: `${RouteSection.User}/questionnaire/creation`,
    inquiry: `${RouteSection.User}/inquiry`,
    inquiryDetail: `${RouteSection.User}/inquiry/detail/:id`,
    history: `${RouteSection.User}/list/history`,
    historyEpisode: `${RouteSection.User}/list/history/:userId/episode`,
    historyEpisodeDetail: `${RouteSection.User}/list/history/:userId/episode/:id`,
    historySubscription: `${RouteSection.User}/list/history/:userId/subscription`,
    historySubscriptionDetail: `${RouteSection.User}/list/history/:userId/subscription/:id`,
    historyMagazine: `${RouteSection.User}/list/history/:userId/magazine_purchase`,
    historyMagazineDetail: `${RouteSection.User}/list/history/:userId/magazine_purchase/:id`,
    historyBonusCoin: `${RouteSection.User}/list/history/:userId/bonus_coin_charge`,
    historyBonusCoinDetail: `${RouteSection.User}/list/history/:userId/bonus_coin_charge/:id`,
    historyPayCoin: `${RouteSection.User}/list/history/:userId/pay_coin_charge`,
    historyPayCoinDetail: `${RouteSection.User}/list/history/:userId/pay_coin_charge/:id`
  }
}
