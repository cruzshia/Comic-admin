export enum CoinProductSearchKeys {
  ProductIdToken = 'product_id_token',
  Status = 'status',
  PublishBeginAt = 'publish_begin_at'
}

export type SearchParam = {
  [key in CoinProductSearchKeys]: any
}

export enum CoinProductKeys {
  Id = 'id',
  ProductIdToken = 'product_id_token',
  AppId = 'app_id',
  PayCoin = 'pay_coin',
  PayBonusCoin = 'pay_bonus_coin',
  Status = 'status',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',
  InsertedAt = 'inserted_at',
  UpdatedAt = 'updated_at'
}

export enum CoinProductStatusType {
  Active = 'active',
  Inactive = 'inactive'
}

export interface CoinProduct {
  [CoinProductKeys.Id]: string
  [CoinProductKeys.ProductIdToken]: string
  [CoinProductKeys.AppId]: string
  [CoinProductKeys.PayCoin]: number
  [CoinProductKeys.PayBonusCoin]: number
  [CoinProductKeys.Status]: CoinProductStatusType
  [CoinProductKeys.PublishBeginAt]: string
  [CoinProductKeys.PublishEndAt]: string
  [CoinProductKeys.InsertedAt]: string
  [CoinProductKeys.UpdatedAt]: string
}
