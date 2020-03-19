import React, { useState, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { NG_WORD_BREADCRUMBS } from '../constants'
import messages from '../messages'
import SwitchTab from './SwitchTab'

export default function NGWord({
  onSubmit,
  defaultValue
}: {
  onSubmit: (value: string) => () => void
  defaultValue: string
}) {
  const { formatMessage } = useIntl()
  const [selectedTab, setSelectedTab] = useState<string>('commentNGWord')
  const [value, setValue] = useState<string>(defaultValue)
  const handleChange = useCallback(e => setValue(e.currentTarget.value), [setValue])
  const handleTabClick = useCallback((id: string) => () => setSelectedTab(id), [setSelectedTab])
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      NG_WORD_BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )
  const tabList = useMemo(
    () => [
      {
        id: 'commentNGWord',
        label: formatMessage(messages.commentNGWord)
      },
      { id: 'accountNGWord', label: formatMessage(messages.accountNGWord) }
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.userNGWordManagement)} />
      <SwitchTab
        tabList={tabList}
        selected={selectedTab}
        onTabClick={handleTabClick}
        onSubmit={onSubmit(value)}
        onChange={handleChange}
        value={value}
      />
    </>
  )
}
