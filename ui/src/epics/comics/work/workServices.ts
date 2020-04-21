import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Work from '@src/models/comics/work'

export const getWorkListAjax = (): Observable<{ status: number; response: Work[] }> => {
  authAjax.get('/work/list')
  return from([
    {
      status: 200,
      response: []
    }
  ])
}
