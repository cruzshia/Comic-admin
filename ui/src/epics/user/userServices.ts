import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { User } from '@src/model/userModel'

// fake response only
export const loginAjax = (
  email: string,
  password: string
): Observable<{ status: number; response: { token: string } }> => {
  authAjax.post('/login', { email, password })
  return from([
    {
      status: 200,
      response: {
        token: 'fake-token'
      }
    }
  ])
}

export const getProfileAjax = (): Observable<{ status: number; response: User }> => {
  authAjax.post('/user/profile')
  return from([
    {
      status: 200,
      response: {
        id: 'abcde',
        email: 'test@mail.com'
      }
    }
  ])
}
