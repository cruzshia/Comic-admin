import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { Profile } from '@src/models/profile'

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

export const getProfileAjax = (): Observable<{ status: number; response: Profile }> => {
  authAjax.get('/user/profile')
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
