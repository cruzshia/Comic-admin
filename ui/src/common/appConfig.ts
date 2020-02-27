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
    list: `${RouteSection.Comics}/list`,
    category: `${RouteSection.Comics}/category`,
    content: `${RouteSection.Comics}/content`,
    author: `${RouteSection.Comics}/author`,
    comment: `${RouteSection.Comics}/comment`,
    subPages: `list|category|content|author|comment`
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
