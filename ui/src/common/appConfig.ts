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
    worksCampaign: `${RouteSection.Comics}/works_campaign`,
    worksCampaignEdit: `${RouteSection.Comics}/works_campaign/edit/:id`,
    worksCampaignDetail: `${RouteSection.Comics}/works_campaign/detail/:id`,
    worksCampaignCreation: `${RouteSection.Comics}/works_campaign/creation`,
    contentsCampaign: `${RouteSection.Comics}/contents_campaign`,
    contentsCampaignCreation: `${RouteSection.Comics}/contents_campaign/creation`,
    contentsCampaignEdit: `${RouteSection.Comics}/contents_campaign/edit/:id`,
    contentsCampaignDetail: `${RouteSection.Comics}/contents_campaign/detail/:id`,
    author: `${RouteSection.Comics}/author`,
    authorDetail: `${RouteSection.Comics}/author/detail/:id`,
    authorEdit: `${RouteSection.Comics}/author/edit/:id`,
    authorCreation: `${RouteSection.Comics}/author/creation`
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
    returnGift: `${RouteSection.User}/return_gift`,
    notification: `${RouteSection.User}/notification`,
    notificationDetail: `${RouteSection.User}/notification/detail/:id`,
    notificationEdit: `${RouteSection.User}/notification/edit/:id`,
    notificationCreation: `${RouteSection.User}/notification/creation`,
    questionnaire: `${RouteSection.User}/questionnaire`,
    questionnaireDetail: `${RouteSection.User}/questionnaire/detail/:id`,
    questionnaireEdit: `${RouteSection.User}/questionnaire/edit/:id`,
    questionnaireCreation: `${RouteSection.User}/questionnaire/creation`,
    contactUs: `${RouteSection.User}/contact_us`,
    contactUsDetail: `${RouteSection.User}/contact_us/detail/:id`,
    history: `${RouteSection.User}/history`,
    historyEpisode: `${RouteSection.User}/history/:userId/episode`,
    historyEpisodeDetail: `${RouteSection.User}/history/:userId/episode/detail/:id`,
    historySubscription: `${RouteSection.User}/history/:userId/subscription`,
    historySubscriptionDetail: `${RouteSection.User}/history/:userId/subscription/detail/:id`
  }
}
