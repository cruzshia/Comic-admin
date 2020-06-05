import { routePath } from '@src/common/appConfig'
import Subscription from '@src/models/comics/subscription'
import { validDateTime, required, INVALID_FORMAT } from '@src/utils/validation'
import messages from './messages'
import commonMessages from '@src/messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.subscription }
]

export const validateSubscription = (values: Subscription) => {
  return {
    name: required(values.name),
    publicStartTime: validDateTime(values.publicStartTime) ? undefined : INVALID_FORMAT,
    publicEndTime: validDateTime(values.publicEndTime) ? undefined : INVALID_FORMAT
  }
}
