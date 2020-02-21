const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

enum ROUTE_SECTION {
  COMICS = '/comics'
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
  }
}
