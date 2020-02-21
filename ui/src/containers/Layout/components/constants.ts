import { MessageDescriptor } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import comicIcon from '@src/assets/header/comic_icon.svg'
import { TabProps } from './HeaderTabItem'
import messages from '../messages'

export const HEADER_TABS: TabProps[] = [
  {
    icon: comicIcon,
    title: messages.comicManagement,
    basePath: routePath.comics.base,
    route: routePath.comics.list
  }
]

interface Tab {
  to: string
  title: MessageDescriptor
}

export const SIDEBAR_TABS: { [key: string]: Tab[] } = {
  [routePath.comics.base]: [
    {
      to: routePath.comics.list,
      title: messages.comicsList
    },
    {
      to: routePath.comics.categories,
      title: messages.comicsCategories
    },
    {
      to: routePath.comics.contents,
      title: messages.comicsContents
    },
    {
      to: routePath.comics.authors,
      title: messages.comicsAuthors
    },
    {
      to: routePath.comics.comments,
      title: messages.comicsComments
    }
  ]
}
