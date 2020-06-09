import { ajax } from 'rxjs/ajax'

let hostUrl = '/api/console'
let commonHeaders: { [key: string]: any } = {}

const TOKEN_KEY = 'x-raise-api-token'

const urlWithHost = (url: string) => hostUrl + url
const authAjax = {
  get: (url: string, headers?: Object) => ajax.get(urlWithHost(url), { ...commonHeaders, ...headers }),
  post: (url: string, body?: any, headers?: Object) =>
    ajax.post(urlWithHost(url), body, { ...commonHeaders, ...headers }),
  put: (url: string, body?: any, headers?: Object) =>
    ajax.put(urlWithHost(url), body, { ...commonHeaders, ...headers }),
  delete: (url: string, headers?: Object) => ajax.delete(urlWithHost(url), { ...commonHeaders, ...headers }),
  patch: (url: string, body?: any, headers?: Object) =>
    ajax.patch(urlWithHost(url), body, { ...commonHeaders, ...headers })
}

export const setHostUrl = (url: string) => (hostUrl = url + '/api/console')
export const setAuthHeader = (token: string) => (commonHeaders[TOKEN_KEY] = token)

export const removeAuthHeader = () => {
  delete commonHeaders[TOKEN_KEY]
}

export const JSON_CONTENT = { 'Content-Type': 'application/json' }

const defaultToken = localStorage.getItem(TOKEN_KEY)
defaultToken && setAuthHeader(defaultToken)

export default authAjax
