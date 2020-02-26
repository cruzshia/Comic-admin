const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

enum ROUTE_SECTION {
  COMICS = '/comics',
  APPLICATION = '/application'
}
export const routePath = {
  root: '/',
  login: '/login',
  comics: {
    base: ROUTE_SECTION.COMICS,
    list: `${ROUTE_SECTION.COMICS}/list`,
    categories: `${ROUTE_SECTION.COMICS}/categories`,
    contents: `${ROUTE_SECTION.COMICS}/contents`,
    authors: `${ROUTE_SECTION.COMICS}/authors`,
    comments: `${ROUTE_SECTION.COMICS}/comments`
  },
  application: {
    base: ROUTE_SECTION.APPLICATION,
    list: `${ROUTE_SECTION.APPLICATION}/list`,
    appScreen: `${ROUTE_SECTION.APPLICATION}/app_screen`,
    advertisement: `${ROUTE_SECTION.APPLICATION}/advertisement`,
    announcement: `${ROUTE_SECTION.APPLICATION}/announcement`,
    coinProduct: `${ROUTE_SECTION.APPLICATION}/coin_product`,
    pushNotification: `${ROUTE_SECTION.APPLICATION}/push_notification`,
    questionnaire: `${ROUTE_SECTION.APPLICATION}/questionnaire`,
    customerService: `${ROUTE_SECTION.APPLICATION}/customer_service`,
    campaign: `${ROUTE_SECTION.APPLICATION}/campaign`
  }
}
