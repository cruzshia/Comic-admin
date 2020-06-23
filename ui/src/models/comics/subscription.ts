import { ImageInfo } from '../image'

export enum SubscriptionKeys {
  ID = 'id',
  Name = 'name',
  PublishBegin = 'publish_begin_at',
  PublishEnd = 'publish_end_at',
  InsertedAt = 'inserted_at',
  UpdatedAt = 'updateAt',
  Image = 'image'
}

export type SubscriptionProduct = any

interface SubscriptionDetail {
  [SubscriptionKeys.ID]: string
  [SubscriptionKeys.Name]: string
  [SubscriptionKeys.Image]?: ImageInfo
  [SubscriptionKeys.PublishBegin]: string
  [SubscriptionKeys.PublishEnd]: string
  [SubscriptionKeys.InsertedAt]?: string
  [SubscriptionKeys.UpdatedAt]?: string
}

export default SubscriptionDetail
