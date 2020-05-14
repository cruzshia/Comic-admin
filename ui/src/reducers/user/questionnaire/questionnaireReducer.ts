import { QuestionnaireActionType } from './questionnaireAction'
import { Questionnaire } from '@src/models/user/questionnaire'
import { ActionType } from '../../types'

export interface QuestionnaireState {
  questionnaireList: Questionnaire[]
  currentQuestionnaire?: Questionnaire
  questionnaireTotal: number
}

const InitState = {
  questionnaireList: [],
  questionnaireTotal: 0
}

export const QuestionnairePreloadState = InitState

export const emptyQuestionnaire: Questionnaire = { questions: [{}] }

const updateQuestionnaireHandler = (
  state: QuestionnaireState = InitState,
  action: ActionType<Questionnaire>
): QuestionnaireState => ({
  ...state,
  currentQuestionnaire: action.payload
})

const handlers: Record<string, (state: QuestionnaireState, action: ActionType<any>) => QuestionnaireState> = {
  [QuestionnaireActionType.GET_LIST_SUCCESS]: (
    state: QuestionnaireState = InitState,
    action: ActionType<Questionnaire[]>
  ) => ({
    ...state,
    questionnaireList: action.payload,
    questionnaireTotal: action.payload.length
  }),
  [QuestionnaireActionType.GET_QUESTIONNAIRE_SUCCESS]: updateQuestionnaireHandler,
  [QuestionnaireActionType.CREATE_SUCCESS]: updateQuestionnaireHandler,
  [QuestionnaireActionType.UPDATE_SUCCESS]: updateQuestionnaireHandler,
  [QuestionnaireActionType.RESET_QUESTIONNAIRE]: updateQuestionnaireHandler
}

export default function questionnaireReducer(state: QuestionnaireState = InitState, action: ActionType<Questionnaire>) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
