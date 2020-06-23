import { routePath } from '@src/common/appConfig'
import {
  CoinEventDetail,
  CoinEventKeys,
  CoinEventRewardKeys,
  CoinEventReward
} from '@src/models/application/coinDeliveryEvent'
import {
  required,
  composeValidators,
  validPositiveInteger,
  validDateTime,
  isValidDuration,
  validNumberAndCharacter,
  INPUT_REQUIRED
} from '@src/utils/validation'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.coinDeliveryEvent }
]

export const REWARD_NUM = 3

export function searchParamsValidator(values: any) {
  const publishBeginAtFrom = values[CoinEventKeys.PublishBeginAtFrom]
  const publishBeginAtTo = values[CoinEventKeys.PublishBeginAtTo]

  return {
    [CoinEventKeys.PublishBeginAtFrom]: publishBeginAtFrom && validDateTime(publishBeginAtFrom),
    [CoinEventKeys.PublishBeginAtTo]: publishBeginAtTo && validDateTime(publishBeginAtTo)
  }
}

const validateRewards = (rewards: CoinEventReward[]) => {
  const newRewards = rewards.filter(item => Object.keys(item).length > 0)

  if (newRewards.length < 1) {
    return [
      {
        [CoinEventRewardKeys.ResultCode]: INPUT_REQUIRED,
        [CoinEventRewardKeys.Type]: INPUT_REQUIRED,
        [CoinEventRewardKeys.Amount]: INPUT_REQUIRED,
        [CoinEventRewardKeys.Restriction]: INPUT_REQUIRED
      }
    ]
  }

  return newRewards.map((reward: CoinEventReward) => ({
    [CoinEventRewardKeys.ResultCode]: composeValidators(
      required,
      validNumberAndCharacter
    )(reward[CoinEventRewardKeys.ResultCode]!),
    [CoinEventRewardKeys.Type]: required(reward[CoinEventRewardKeys.Type]!),
    [CoinEventRewardKeys.Amount]: composeValidators(
      required,
      validPositiveInteger
    )(reward[CoinEventRewardKeys.Amount]!),
    [CoinEventRewardKeys.Restriction]: required(reward[CoinEventRewardKeys.Restriction]!)
  }))
}

export function validateCoinEvent(values: Partial<CoinEventDetail>) {
  const rewardsData = values[CoinEventKeys.Rewards]
  const publishBeginAt = values[CoinEventKeys.PublishBeginAt]
  const publishEndAt = values[CoinEventKeys.PublishEndAt]

  return {
    [CoinEventKeys.Name]: required(values[CoinEventKeys.Name]!),
    [CoinEventKeys.EventType]: required(values[CoinEventKeys.EventType]!),
    [CoinEventKeys.Rewards]: rewardsData && validateRewards(rewardsData!),
    [CoinEventKeys.PublishBeginAt]: composeValidators(required, validDateTime)(publishBeginAt),
    [CoinEventKeys.PublishEndAt]:
      composeValidators(required, validDateTime)(values[CoinEventKeys.EventType]!) ||
      (publishBeginAt && isValidDuration(publishBeginAt, publishEndAt!))
  }
}
