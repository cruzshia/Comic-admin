export enum CoinEventKeys {
  ID = 'id',
  CustomEventIdToken = 'custom_event_id_token',
  Name = 'name',
  EventType = 'event_type',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',

  PublishBeginAtFrom = 'publish_begin_at_from',
  PublishBeginAtTo = 'publish_begin_at_to',

  Rewards = 'rewards',
  InsertedAt = 'inserted_at',
  UpdatedAt = 'updated_at'
}

export enum CoinEventRewardKeys {
  ResultCode = 'result_code',
  Type = 'type',
  Amount = 'amount',
  Restriction = 'restriction'
}

export enum EventType {
  OneTime = 'one_time',
  Daily = 'daily'
}

export enum CoinEventRewardType {
  BonusCoin = 'bonus_coin',
  PayGiftCoin = 'pay_gift_coin'
}

export enum CoinEventRewardRestriction {
  NoneRestriction = 'none_restriction',
  OneTime = 'one_time'
}

export interface CoinEventReward {
  [CoinEventRewardKeys.ResultCode]: string
  [CoinEventRewardKeys.Type]: CoinEventRewardType
  [CoinEventRewardKeys.Amount]: number
  [CoinEventRewardKeys.Restriction]: CoinEventRewardRestriction
}

export interface CoinDeliveryEvent {
  [CoinEventKeys.ID]: string
  [CoinEventKeys.CustomEventIdToken]: string
  [CoinEventKeys.Name]: string
  [CoinEventKeys.EventType]: EventType
  [CoinEventKeys.PublishBeginAt]: string
  [CoinEventKeys.PublishEndAt]: string
}

export interface CoinEventDetail extends CoinDeliveryEvent {
  [CoinEventKeys.Rewards]: CoinEventReward[]
  [CoinEventKeys.InsertedAt]: string
  [CoinEventKeys.UpdatedAt]: string
}

export interface CoinEventRequestBody {
  [CoinEventKeys.Name]: string
  [CoinEventKeys.EventType]: EventType
  [CoinEventKeys.Rewards]: CoinEventReward[]
  [CoinEventKeys.PublishBeginAt]: string
  [CoinEventKeys.PublishEndAt]: string
}

type CoinDelivery = any
export default CoinDelivery
