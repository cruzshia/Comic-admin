import commonMessage from '@src/messages'
import userMessage from '../messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessage.userManagement },
  { title: userMessage.list, route: routePath.user.list }
]

export enum ListTableProp {
  CreateDateTime = 'createDateTime',
  LastLoginTime = 'lastLoginTime',
  EmailAddress = 'emailAddress',
  NickName = 'nickName',
  UserId = 'userId',
  Status = 'status'
}
