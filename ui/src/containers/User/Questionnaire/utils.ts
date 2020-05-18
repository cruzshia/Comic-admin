import commonMessages from '@src/messages'
import messages from './messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: messages.questionnaireList, route: routePath.user.questionnaire }
]

export enum QuestionType {
  MultipleDropdown = 'multipleDropdown',
  DropDown = 'dropdown',
  TextBoxSingleLine = 'textBoxSingleLine',
  TextBoxMultipleLine = 'textBoxMultipleLine',
  MultipleTextBox = 'multipleTextBox',
  RadioButton = 'radioButton'
}
