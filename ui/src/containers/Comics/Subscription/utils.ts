import { routePath } from '@src/common/appConfig'
import Subscription, { SubscriptionKeys } from '@src/models/comics/subscription'
import { validDateTime, required } from '@src/utils/validation'
import messages from './messages'
import commonMessages from '@src/messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.subscription }
]

export const validateSubscription = (values: Subscription) => {
  return {
    [SubscriptionKeys.Name]: required(values[SubscriptionKeys.Name]),
    [SubscriptionKeys.Image]: required(values[SubscriptionKeys.Image]),
    [SubscriptionKeys.PublishBegin]: validDateTime(values[SubscriptionKeys.PublishBegin]),
    [SubscriptionKeys.PublishEnd]: validDateTime(values[SubscriptionKeys.PublishEnd])
  }
}
