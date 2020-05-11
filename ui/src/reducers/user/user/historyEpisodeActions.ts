import HistoryEpisode from '@src/models/user/historyEpisode'

export enum HistoryEpisodeActionType {
  GET_LIST = '@HistoryEpisode/GET_LIST',
  GET_LIST_SUCCESS = '@HistoryEpisode/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@HistoryEpisode/GET_LIST_ERROR',

  GET_HISTORY_EPISODE = '@HistoryEpisode/GET_HISTORY_EPISODE',
  GET_HISTORY_EPISODE_SUCCESS = '@HistoryEpisode/GET_HISTORY_EPISODE_SUCCESS',
  GET_HISTORY_EPISODE_ERROR = '@HistoryEpisode/GET_HISTORY_EPISODE_ERROR'
}

export const getHistoryEpisodeListAction = () => ({
  type: HistoryEpisodeActionType.GET_LIST
})

export const getHistoryEpisodeListSuccessAction = (payload: HistoryEpisode[]) => ({
  type: HistoryEpisodeActionType.GET_LIST_SUCCESS,
  payload
})

export const getHistoryEpisodeAction = (historyId: string) => ({
  type: HistoryEpisodeActionType.GET_HISTORY_EPISODE,
  payload: historyId
})

export const getHistoryEpisodeSuccessAction = (history: HistoryEpisode) => ({
  type: HistoryEpisodeActionType.GET_HISTORY_EPISODE_SUCCESS,
  payload: history
})
