import React, { useContext, useState, useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconPublish } from '@src/assets/common/publish.svg'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import ListTable from '@src/components/table/ListTable'
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import { Work } from '@src/model/comicsWorkModel'
import { WORKS_BREADCRUMBS } from '../constants'
import messages from '../messages'
import workContext from '../workContext'

const limit = 99

export default function WorkList() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { workList, workTotal } = useContext(workContext)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page] = useState<number>(0)

  const pagination = useMemo(() => ({ total: workTotal, start: page * limit + 1 }), [page, workTotal])
  const workDataList = workList.map(item => ({ id: item.workID, data: item }))
  const titleText = formatMessage(messages.comicsWork)
  const breadcrumbList: Breadcrumb[] = WORKS_BREADCRUMBS.reduce(
    (acc, current) => [{ title: formatMessage(current.title) }].concat(acc),
    [] as Breadcrumb[]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={ButtonTheme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.workCreation)}
        icon={IconEdit}
      />,
      <Button
        theme={ButtonTheme.DARK_BORDER}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
        icon={IconSave}
      />
    ],
    [formatMessage, history]
  )

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        { label: formatMessage(messages.workId), input: <SearchInput icon /> },
        { label: formatMessage(commonMessages.author), input: <Select list={[]} /> },
        { label: formatMessage(messages.category), input: <Select list={[]} /> },
        { label: formatMessage(messages.deliveryStartDateTime), input: <TimeSpanInput /> },
        { label: formatMessage(messages.deliveryEndDateTime), input: <TimeSpanInput /> },
        { label: formatMessage(messages.adUnit), input: <Select list={[]} isShort /> }
      ],
      right: [
        { label: formatMessage(messages.rensaiStatus), input: <Select list={[]} isShort /> },
        { label: formatMessage(messages.rensaiMagazine), input: <Select list={[]} /> },
        { label: formatMessage(messages.rensaiFrequency), input: <Select list={[]} isShort /> },
        { label: formatMessage(messages.rensaiDay), input: <Select list={[]} isShort /> },
        { label: formatMessage(messages.rankingGroup), input: <Select list={[]} isShort /> }
      ]
    }),
    [formatMessage]
  )

  const tableButtonList = [
    <Button
      theme={ButtonTheme.LIGHT}
      buttonText={formatMessage(messages.csvOutput)}
      onClick={() => {}}
      icon={IconPublish}
    />,
    <Button theme={ButtonTheme.LIGHT} buttonText={formatMessage(messages.csvOutputLog)} onClick={() => {}} />
  ]

  const tableTitleList = useMemo(
    () => [
      { id: 'image', label: '画像' },
      { id: 'workID', label: '作品ID' },
      { id: 'title', label: '作品タイトル' },
      {
        id: 'releaseDate',
        label: '作成日時',
        onSort: (id: keyof Work) => setSortOrder(sortOrder => (sortOrder === 'asc' ? 'desc' : 'asc'))
      },
      { id: 'category', label: '作品種別' },
      { id: 'property', label: '話作品種別' },
      { id: 'updateFrequency', label: '更新頻度' }
    ],
    [setSortOrder]
  )

  const handleRowClick = useCallback(
    id => {
      history.push(routePath.comics.workDetail.replace(':id', id))
    },
    [history]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <SearchFilter conditions={conditions} />
      <ListTable
        titleList={tableTitleList}
        dataList={workDataList}
        pagination={pagination}
        buttonList={tableButtonList}
        sortBy='releaseDate'
        sortOrder={sortOrder}
        onRowClick={handleRowClick}
      />
    </>
  )
}
