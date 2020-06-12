export enum CoinDeliveryEventKeys {
  ID = 'id',
  CustomEventIdToken = 'custom_event_id_token',
  Name = 'name',
  EventType = 'event_type',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',

  PublishBeginAtFrom = 'publish_begin_at_from',
  PublishBeginAtTo = 'publish_begin_at_to'
}

export enum EventType {
  OneTime = 'one_time',
  Daily = 'daily'
}

export interface CoinDeliveryEvent {
  [CoinDeliveryEventKeys.ID]: string
  [CoinDeliveryEventKeys.CustomEventIdToken]: string
  [CoinDeliveryEventKeys.Name]: string
  [CoinDeliveryEventKeys.EventType]: EventType
  [CoinDeliveryEventKeys.PublishBeginAt]: string
  [CoinDeliveryEventKeys.PublishEndAt]: string
}

type CoinDelivery = any
export default CoinDelivery
