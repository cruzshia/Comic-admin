import React from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { BREADCRUMBS } from '../utils'

interface Props {
  breadcrumb?: string
  title?: string
  buttonList?: JSX.Element[]
}

export default function HeadBlock({ breadcrumb, title, buttonList }: Props) {
  const { formatMessage } = useIntl()
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route: breadcrumb ? route : undefined
  }))
  breadcrumb && breadcrumbList.push({ title: breadcrumb, route: undefined })

  return <ContentHeader titleText={title} breadcrumbList={breadcrumbList} buttonList={buttonList} />
}
