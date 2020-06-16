import AuthorDetail, { AuthorKey } from '@src/models/comics/author'
import { required, composeValidators, isValidLength, CHARACTER_LIMIT } from '@src/utils/validation'
import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.author }
]

export const validateAuthor = ({ [AuthorKey.Name]: name, [AuthorKey.NameKana]: nameKana }: Partial<AuthorDetail>) => ({
  [AuthorKey.Name]: composeValidators(required, isValidLength(CHARACTER_LIMIT))(name),
  [AuthorKey.NameKana]: composeValidators(required, isValidLength(CHARACTER_LIMIT))(nameKana)
})
