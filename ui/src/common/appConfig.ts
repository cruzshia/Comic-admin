const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

export const routePath = {
  root: '/',
  login: '/login',
  comic: {
    base: '/comic'
  }
}
