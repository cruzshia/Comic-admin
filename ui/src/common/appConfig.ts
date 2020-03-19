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
    content: `${RouteSection.Comics}/content`,
    worksCampaign: `${RouteSection.Comics}/works_campaign`,
    contentsCampaign: `${RouteSection.Comics}/contents_campaign`,
    author: `${RouteSection.Comics}/author`
  },
  application: {
    base: RouteSection.Application,
    displaySetting: `${RouteSection.Application}/display_setting`,
    coinDeliveryEvent: `${RouteSection.Application}/coin_delivery_event`,
    pushNotification: `${RouteSection.Application}/push_notification`,
    coinProduct: `${RouteSection.Application}/coin_product`,
    applicationInfo: `${RouteSection.Application}/application_info`
  },
  user: {
    base: RouteSection.User,
    list: `${RouteSection.User}/list`,
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
