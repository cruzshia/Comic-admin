import { routePath } from '@src/common/appConfig'
import Subscription from '@src/models/comics/subscription'
import { validDateTime, required } from '@src/utils/validation'
import messages from './messages'
import commonMessages from '@src/messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.subscription }
]

const dateFormatError = 'Wrong format'
export const validateSubscription = (values: Subscription) => {
  return {
    name: required(values.name),
    publicStartTime: validDateTime(values.publicStartTime) ? undefined : dateFormatError,
    publicEndTime: validDateTime(values.publicEndTime) ? undefined : dateFormatError
  }
}
