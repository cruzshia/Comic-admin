import { MessageDescriptor } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import comicIcon from '@src/assets/header/comic_icon.svg'
import phoneIcon from '@src/assets/header/phone_icon.svg'
import { TabProps } from './HeaderTabItem'
import messages from '../messages'

export const HEADER_TABS: TabProps[] = [
  {
    icon: comicIcon,
    title: messages.comicManagement,
    basePath: routePath.comics.base,
    route: routePath.comics.list
  },
  {
    icon: phoneIcon,
    title: messages.applicationManagement,
    basePath: routePath.application.base,
    route: routePath.application.list
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
  ],
  [routePath.application.base]: [
    {
      to: routePath.application.list,
      title: messages.applicationList
    },
    {
      to: routePath.application.appScreen,
      title: messages.applicationAppScreen
    },
    {
      to: routePath.application.advertisement,
      title: messages.applicationAdvertisement
    },
    {
      to: routePath.application.announcement,
      title: messages.applicationAnnouncement
    },
    {
      to: routePath.application.coinProduct,
      title: messages.applicationCoinProduct
    },
    {
      to: routePath.application.pushNotification,
      title: messages.applicationPushNotification
    },
    {
      to: routePath.application.questionnaire,
      title: messages.applicationQuestionnaire
    },
    {
      to: routePath.application.customerService,
      title: messages.applicationCustomerService
    },
    {
      to: routePath.application.campaign,
      title: messages.applicationCampaign
    }
  ]
}
