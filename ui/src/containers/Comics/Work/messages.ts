import { defineMessages } from 'react-intl'
import { WorkType, EpisodeWorkType, RensaiStatus } from '@src/models/comics/work'

const PREFIX = 'comics.work.'

export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: 'Work List'
  },
  category: {
    id: PREFIX + 'category',
    defaultMessage: 'Work category'
  },
  episodeCategory: {
    id: PREFIX + 'episode_category',
    defaultMessage: 'Work episode category'
  },
  updateFrequency: {
    id: PREFIX + 'update_frequency',
    defaultMessage: 'Update frequency'
  },
  rensai: {
    id: PREFIX + 'rensai',
    defaultMessage: 'rensai'
  },
  workTitle: {
    id: PREFIX + 'work_title',
    defaultMessage: 'Work title'
  },
  titleKana: {
    id: PREFIX + 'title_kana',
    defaultMessage: 'Title (Kana)'
  },
  titleShort: {
    id: PREFIX + 'title_short',
    defaultMessage: 'Title (Short)'
  },
  introduction: {
    id: PREFIX + 'introduction',
    defaultMessage: 'Introduction'
  },
  addNotification: {
    id: PREFIX + 'add_notification_setting',
    defaultMessage: 'Add notification setting'
  },
  edit: {
    id: PREFIX + 'edit',
    defaultMessage: 'Edit work'
  },
  editStart: {
    id: PREFIX + 'edit_start',
    defaultMessage: 'Edit work'
  },
  comicsWork: {
    id: 'comics.work',
    defaultMessage: 'Comics work'
  },
  startCreate: {
    id: PREFIX + 'create_start',
    defaultMessage: 'Comic work list button text (creation)'
  },
  detail: {
    id: PREFIX + 'detail',
    defaultMessage: 'Comic work detail'
  },
  rensaiStatus: {
    id: PREFIX + 'rensai_status',
    defaultMessage: 'Rensai Status'
  },
  rensaiMagazine: {
    id: PREFIX + 'rensai_magazine',
    defaultMessage: 'Rensai Magazine'
  },
  rensaiFrequency: {
    id: PREFIX + 'rensai_frequency',
    defaultMessage: 'Rensai Frequency'
  },
  rensaiDay: {
    id: PREFIX + 'rensai_day',
    defaultMessage: 'Rensai Day'
  },
  createWork: {
    id: PREFIX + 'create',
    defaultMessage: 'Create work'
  },
  episodeFrequency: {
    id: PREFIX + 'episode_frequency',
    defaultMessage: 'Episode Frequency'
  },
  reduction: {
    id: PREFIX + 'reduction',
    defaultMessage: 'Reduction'
  },
  worksCsvImportLog: {
    id: PREFIX + 'works_csv_import_log',
    defaultMessage: 'Works CSV Import Log'
  },
  csvImport: {
    id: PREFIX + 'works_csv_import',
    defaultMessage: 'Works CSV Import'
  },
  episode: {
    id: PREFIX + 'type_episode',
    defaultMessage: 'Episode'
  },
  [WorkType.Comic]: {
    id: PREFIX + 'type_comic',
    defaultMessage: 'Comic'
  },
  [WorkType.Novel]: {
    id: PREFIX + 'type_novel',
    defaultMessage: 'Novel'
  },
  [WorkType.Magazine]: {
    id: PREFIX + 'type_magazine',
    defaultMessage: 'Magazine'
  },
  [WorkType.Bonus]: {
    id: PREFIX + 'type_bonus',
    defaultMessage: 'Bonus'
  },
  [EpisodeWorkType.Original]: {
    id: PREFIX + 'episode_original',
    defaultMessage: 'Original Rensai'
  },
  [EpisodeWorkType.OneShot]: {
    id: PREFIX + 'episode_one_shot',
    defaultMessage: 'Read All'
  },
  [EpisodeWorkType.Reprint]: {
    id: PREFIX + 'episode_reprint',
    defaultMessage: 'Reprint'
  },
  [EpisodeWorkType.Trial]: {
    id: PREFIX + 'episode_look_inside',
    defaultMessage: 'Trial'
  },
  [EpisodeWorkType.Campaign]: {
    id: PREFIX + 'episode_campaign',
    defaultMessage: 'Campaign'
  },
  [EpisodeWorkType.Rookie]: {
    id: PREFIX + 'episode_rookie',
    defaultMessage: 'First Rensai'
  },
  [EpisodeWorkType.Other]: {
    id: PREFIX + 'episode_other',
    defaultMessage: 'Other'
  },
  [RensaiStatus.Ongoing]: {
    id: PREFIX + 'rensai_ongoing',
    defaultMessage: 'Rensai Ongoing'
  },
  [RensaiStatus.End]: {
    id: PREFIX + 'rensai_end',
    defaultMessage: 'Rensai End'
  },
  [RensaiStatus.Rest]: {
    id: PREFIX + 'rensai_rest',
    defaultMessage: 'Rensai Rest'
  }
})
