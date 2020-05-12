import authAjax from '@src/utils/ajaxUtil'
import { mockList } from './mockData/mock'
import { from, Observable } from 'rxjs'
import { GiftComicsCsvLog } from '@src/models/user/giftComics'

export const getCsvLogListAjax: () => Observable<{ status: number; response: GiftComicsCsvLog[] }> = () => {
  authAjax.get('/gift_comics/batch_logs')
  return from([
    {
      status: 200,
      response: mockList
    }
  ])
}
