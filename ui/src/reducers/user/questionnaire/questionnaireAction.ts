import { Questionnaire } from '@src/models/user/questionnaire'

export enum QuestionnaireActionType {
  GET_LIST = '@Questionnaire/GET_LIST',
  GET_LIST_SUCCESS = '@Questionnaire/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@Questionnaire/GET_LIST_ERROR',

  GET_QUESTIONNAIRE = '@Questionnaire/GET_QUESTIONNAIRE',
  GET_QUESTIONNAIRE_SUCCESS = '@Questionnaire/GET_QUESTIONNAIRE_SUCCESS',
  GET_QUESTIONNAIRE_ERROR = '@Questionnaire/GET_QUESTIONNAIRE_ERROR',

  CREATE = '@Questionnaire/CREATE',
  CREATE_SUCCESS = '@Questionnaire/CREATE_SUCCESS',
  CREATE_ERROR = '@Questionnaire/CREATE_ERROR',

  UPDATE = '@Questionnaire/UPDATE',
  UPDATE_SUCCESS = '@Questionnaire/UPDATE_SUCCESS',
  UPDATE_ERROR = '@Questionnaire/UPDATE_ERROR',

  RESET_QUESTIONNAIRE = '@Questionnaire/RESET_QUESTIONNAIRE '
}

export const getQuestionnaireListAction = () => ({
  type: QuestionnaireActionType.GET_LIST
})

export const getQuestionnaireListSuccessAction = (payload: Questionnaire[]) => ({
  type: QuestionnaireActionType.GET_LIST_SUCCESS,
  payload
})

export const getQuestionnaireAction = (questionnaireId: string) => ({
  type: QuestionnaireActionType.GET_QUESTIONNAIRE,
  payload: questionnaireId
})

export const getQuestionnaireSuccessAction = (payload: Questionnaire) => ({
  type: QuestionnaireActionType.GET_QUESTIONNAIRE_SUCCESS,
  payload
})

export const createQuestionnaireAction = (payload: Questionnaire) => ({
  type: QuestionnaireActionType.CREATE,
  payload
})

export const createQuestionnaireSuccessAction = (payload: Questionnaire) => ({
  type: QuestionnaireActionType.CREATE_SUCCESS,
  payload
})

export const updateQuestionnaireAction = (payload: Questionnaire) => ({
  type: QuestionnaireActionType.UPDATE,
  payload
})

export const updateQuestionnaireSuccessAction = (payload: Questionnaire) => ({
  type: QuestionnaireActionType.UPDATE_SUCCESS,
  payload
})

export const resetQuestionnaireAction = () => ({
  type: QuestionnaireActionType.RESET_QUESTIONNAIRE
})
