import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import { WorkSearchKeys } from '@src/models/comics/work'
import { validDateTime } from '@src/utils/validation'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.work }
]

export function searchParamsValidator(values: { [key: string]: any }) {
  return {
    [WorkSearchKeys.PublishBeginAtFrom]:
      values[WorkSearchKeys.PublishBeginAtFrom] && !validDateTime(values[WorkSearchKeys.PublishBeginAtFrom])
        ? 'Wrong format'
        : undefined
  }
}
