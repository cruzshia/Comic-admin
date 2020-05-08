import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { Questionnaire } from '@src/models/user/questionnaire'
import { mockQuestionnaire, mockQuestionnaireList } from './mockData/mockData'

export const getQuestionnaireListAjax = (): Observable<{ status: number; response: Questionnaire[] }> => {
  authAjax.get(`/user/questionnaire`)
  return from([
    {
      status: 200,
      response: mockQuestionnaireList
    }
  ])
}

export const getQuestionnaireAjax = (id: string): Observable<{ status: number; response: Questionnaire }> => {
  authAjax.get(`/user/questionnaire/${id}`)
  return from([
    {
      status: 200,
      response: mockQuestionnaire
    }
  ])
}

export const createQuestionnaireAjax = (
  data: Questionnaire
): Observable<{ status: number; response: Questionnaire }> => {
  authAjax.post('/user/questionnaire', data)
  return from([
    {
      status: 200,
      response: mockQuestionnaire
    }
  ])
}

export const updateQuestionnaireAjax = (
  data: Questionnaire
): Observable<{ status: number; response: Questionnaire }> => {
  authAjax.put('/user/questionnaire', data)
  return from([
    {
      status: 200,
      response: mockQuestionnaire
    }
  ])
}
