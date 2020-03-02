import { MessageDescriptor } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import comicIcon from '@src/assets/header/comic.svg'
import phoneIcon from '@src/assets/header/phone.svg'
import userIcon from '@src/assets/header/user.svg'
import reportIcon from '@src/assets/header/report.svg'
import systemIcon from '@src/assets/header/system.svg'
import { TabProps } from './HeaderTabItem'
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
    title: messages.comicManagement,
    basePath: routePath.comics.base,
    route: routePath.comics.work
  },
  {
    icon: phoneIcon,
    title: messages.applicationManagement,
    basePath: routePath.application.base,
    route: routePath.application.list
  },
  {
    icon: userIcon,
    title: messages.userManagement,
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
      title: messages.comicsAuthor
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
  ],
  [routePath.user.base]: [
    {
      to: routePath.user.list,
      title: messages.userList
    },
    {
      to: routePath.user.accountCode,
      title: messages.userAccountCodeManagement
    },
    {
      to: routePath.user.ngWord,
      title: messages.userNGWordManagement
    },
    {
      to: routePath.user.contentGift,
      title: messages.userContentGift
    },
    {
      to: routePath.user.coinGift,
      title: messages.userCoinGift
    }
  ]
}
