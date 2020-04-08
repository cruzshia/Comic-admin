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
    author: `${RouteSection.Comics}/author`
  },
  application: {
    base: RouteSection.Application,
    displaySetting: `${RouteSection.Application}/display_setting`,
    displaySettingEdit: `${RouteSection.Application}/display_setting/edit/:id`,
    displaySettingCreation: `${RouteSection.Application}/display_setting/creation`,
    coinDeliveryEvent: `${RouteSection.Application}/coin_delivery_event`,
    pushNotification: `${RouteSection.Application}/push_notification`,
    pushNotificationEdit: `${RouteSection.Application}/push_notification/edit/:id`,
    pushNotificationCreation: `${RouteSection.Application}/push_notification/creation/:id`,
    coinProduct: `${RouteSection.Application}/coin_product`,
    applicationInfo: `${RouteSection.Application}/application_info`
  },
  user: {
    base: RouteSection.User,
    list: `${RouteSection.User}/list`,
    userDetail: `${RouteSection.User}/list/detail/:id`,
    userEdit: `${RouteSection.User}/list/edit/:id`,
    comment: `${RouteSection.User}/comment`,
    commentDetail: `${RouteSection.User}/comment/detail/:id`,
    commentEdit: `${RouteSection.User}/comment/edit/:id`,
    ngWord: `${RouteSection.User}/ng_word`,
    returnGift: `${RouteSection.User}/return_gift`,
    inquiry: `${RouteSection.User}/inquiry`,
    notification: `${RouteSection.User}/notification`,
    questionnaire: `${RouteSection.User}/questionnaire`
  }
}
