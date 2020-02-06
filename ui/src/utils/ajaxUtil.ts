import { ajax } from 'rxjs/ajax'

let hostUrl = '/'
let commonHeaders: { [key: string]: any } = {}

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

export const setHostUrl = (url: string) => (hostUrl = url)
export const setAuthHeader = (token: string) =>
  (commonHeaders.Authorization = token)

export const removeAuthHeader = () => {
  delete commonHeaders.Authorization
}

export default authAjax
