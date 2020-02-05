import authAjax from '../../utils/ajaxUtil'
import { from } from 'rxjs'

export const loginAjax = (email: string, password: string) => {
  // this is fake request
  authAjax.post('/login', { email, password })
  return from([
    {
      status: 200,
      response: {
        token: 'fake-token',
        email,
        id: 'abcdefg'
      }
    }
  ])
}
