import commonMessage from '@src/messages'
import messages from './messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessage.userManagement },
  { title: messages.userList, route: routePath.user.list }
]

export enum ListTableProp {
  CreateDateTime = 'createDateTime',
  LastLoginTime = 'lastLoginTime',
  EmailAddress = 'emailAddress',
  NickName = 'nickName',
  UserId = 'userId',
  Status = 'status'
}
