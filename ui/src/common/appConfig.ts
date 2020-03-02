const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

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
    content: `${RouteSection.Comics}/content`,
    worksCampaign: `${RouteSection.Comics}/works_campaign`,
    contentsCampaign: `${RouteSection.Comics}/contents_campaign`,
    author: `${RouteSection.Comics}/author`,
    subPages: `work|content|works_campaign|contents_campaign|author`
  },
  application: {
    base: RouteSection.Application,
    list: `${RouteSection.Application}/list`,
    appScreen: `${RouteSection.Application}/app_screen`,
    advertisement: `${RouteSection.Application}/advertisement`,
    announcement: `${RouteSection.Application}/announcement`,
    coinProduct: `${RouteSection.Application}/coin_product`,
    pushNotification: `${RouteSection.Application}/push_notification`,
    questionnaire: `${RouteSection.Application}/questionnaire`,
    customerService: `${RouteSection.Application}/customer_service`,
    campaign: `${RouteSection.Application}/campaign`,
    subPages:
      'list|app_screen|advertisement|announcement|coin_product|push_notification|questionnaire|customer_service|campaign'
  },
  user: {
    base: RouteSection.User,
    list: `${RouteSection.User}/list`,
    accountCode: `${RouteSection.User}/account_code`,
    ngWord: `${RouteSection.User}/ng_word`,
    contentGift: `${RouteSection.User}/content_gift`,
    coinGift: `${RouteSection.User}/coin_gift`,
    subPages: 'list|account_code|ng_word|content_gift|coin_gift'
  }
}
