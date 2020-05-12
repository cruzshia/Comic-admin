import HistorySubscription from '@src/models/user/historySubscription'

export enum HistorySubscriptionActionType {
  GET_LIST = '@HistorySubscription/GET_LIST',
  GET_LIST_SUCCESS = '@HistorySubscription/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistorySubscription/GET_LIST_ERROR',

  GET_HISTORY_SUBSCRIPTION = '@HistorySubscription/GET_SUBSCRIPTION',
  GET_HISTORY_SUBSCRIPTION_SUCCESS = '@HistorySubscription/GET_SUBSCRIPTION_SUCCESS',
  GET_HISTORY_SUBSCRIPTION_ERROR = '@HistorySubscription/GET_SUBSCRIPTION_ERROR',
  RESET_HISTORY_SUBSCRIPTION = '@HistorySubscription/RESET_HISTORY_SUBSCRIPTION'
}

export const getHistorySubscriptionListAction = () => ({
  type: HistorySubscriptionActionType.GET_LIST
})

export const getHistorySubscriptionListSuccessAction = (payload: HistorySubscription[]) => ({
  type: HistorySubscriptionActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistorySubscriptionAction = (historyId: string) => ({
  type: HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION,
  payload: historyId
})

export const getHistorySubscriptionSuccessAction = (history: HistorySubscription) => ({
  type: HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION_SUCCESS,
  payload: history
})

export const resetHistorySubscriptionAction = () => ({
  type: HistorySubscriptionActionType.RESET_HISTORY_SUBSCRIPTION
})
