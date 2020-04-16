import { MessageDescriptor } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import comicIcon from '@src/assets/header/comic.svg'
import phoneIcon from '@src/assets/header/phone.svg'
import userIcon from '@src/assets/header/user.svg'
import reportIcon from '@src/assets/header/report.svg'
import systemIcon from '@src/assets/header/system.svg'
import { TabProps } from './HeaderTabItem'
import commonMessages from '@src/messages'
import messages from '../messages'

export const SYSTEM_MENUS = [
  {
    title: messages.systemMenuFileManagement,
    route: '#'
  },
  {
    title: messages.systemMenuHelp,
    route: '#'
  },
  {
    title: messages.systemMenuAccount,
    route: '#',
    subMenu: []
  }
]

export const HEADER_TABS: TabProps[] = [
  {
    icon: comicIcon,
    title: commonMessages.comicsManagement,
    basePath: routePath.comics.base,
    route: routePath.comics.work
  },
  {
    icon: phoneIcon,
    title: commonMessages.applicationManagement,
    basePath: routePath.application.base,
    route: routePath.application.displaySetting
  },
  {
    icon: userIcon,
    title: commonMessages.userManagement,
    basePath: routePath.user.base,
    route: routePath.user.list
  }
]

export const HEADER_TABS_RIGHT: TabProps[] = [
  {
    icon: reportIcon,
    title: messages.menuReport,
    route: '#'
  },
  {
    icon: systemIcon,
    title: messages.menuSystemSetting,
    route: '#/'
  }
]

interface Tab {
  to: string
  title: MessageDescriptor
}

export const SIDEBAR_TABS: { [key: string]: Tab[] } = {
  [routePath.comics.base]: [
    {
      to: routePath.comics.work,
      title: messages.comicsWork
    },
    {
      to: routePath.comics.content,
      title: messages.comicsContent
    },
    {
      to: routePath.comics.worksCampaign,
      title: messages.comicsWorksCampaign
    },
    {
      to: routePath.comics.contentsCampaign,
      title: messages.comicsContentsCampaign
    },
    {
      to: routePath.comics.author,
      title: messages.comicsAuthorManagement
    }
  ],
  [routePath.application.base]: [
    {
      to: routePath.application.displaySetting,
      title: messages.applicationDisplaySetting
    },
    {
      to: routePath.application.coinDeliveryEvent,
      title: messages.applicationCoinDeliveryEvent
    },
    {
      to: routePath.application.pushNotification,
      title: messages.applicationPushNotification
    },
    {
      to: routePath.application.coinProduct,
      title: messages.applicationCoinProduct
    },
    {
      to: routePath.application.applicationInfo,
      title: messages.applicationApplicationInfo
    }
  ],
  [routePath.user.base]: [
    {
      to: routePath.user.list,
      title: messages.userList
    },
    {
      to: routePath.user.comment,
      title: messages.userComment
    },
    {
      to: routePath.user.ngWord,
      title: messages.userNGWordManagement
    },
    {
      to: routePath.user.returnGift,
      title: messages.userReturnGift
    },
    {
      to: routePath.user.inquiry,
      title: messages.userInquiry
    },
    {
      to: routePath.user.notification,
      title: messages.userNotificationManagement
    },
    {
      to: routePath.user.questionnaire,
      title: messages.userQuestionnaireManagement
    }
  ]
}
