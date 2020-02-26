const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

enum RouteSection {
  Comics = '/comics',
  Application = '/application'
}
export const routePath = {
  root: '/',
  login: '/login',
  comics: {
    base: RouteSection.Comics,
    list: `${RouteSection.Comics}/list`,
    categories: `${RouteSection.Comics}/categories`,
    contents: `${RouteSection.Comics}/contents`,
    authors: `${RouteSection.Comics}/authors`,
    comments: `${RouteSection.Comics}/comments`
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
    campaign: `${RouteSection.Application}/campaign`
  }
}
