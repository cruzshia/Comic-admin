import React, { useContext, useState, useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconPublish } from '@src/assets/common/publish.svg'
import ListTable from '@src/components/table/ListTable'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { routePath } from '@src/common/appConfig'
import { Work } from '@src/model/comicsWorkModel'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import workContext from '../context/WorkContext'

const limit = 99

export default function WorkList() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { workList, workTotal } = useContext(workContext)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page] = useState<number>(0)

  const breadcrumbList: Breadcrumb[] = useMemo(
    () => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.workCreation)}
        icon={IconEdit}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
        icon={IconSave}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback((data: any) => console.log(data), [])

  const pagination = useMemo(() => ({ total: workTotal, start: page * limit + 1 }), [page, workTotal])
  const workDataList = workList.map(item => ({ id: item.workID, data: item }))
  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.csvExport)}
        icon={IconPublish}
        onClick={() => history.push(routePath.comics.workExport)}
      />
    ],
    [formatMessage, history]
  )
  const theadList = useMemo(
    () => [
      { id: 'image', label: formatMessage(commonMessages.photo) },
      { id: 'workID', label: formatMessage(messages.id) },
      { id: 'title', label: formatMessage(messages.workTitle) },
      {
        id: 'releaseDate',
        label: formatMessage(commonMessages.createDateTime),
        onSort: (id: keyof Work) => setSortOrder(sortOrder => (sortOrder === 'asc' ? 'desc' : 'asc'))
      },
      { id: 'category', label: formatMessage(messages.category) },
      { id: 'episodeCategory', label: formatMessage(messages.episodeCategory) },
      { id: 'updateFrequency', label: formatMessage(messages.updateFrequency) }
    ],
    [setSortOrder, formatMessage]
  )
  const handleRowClick = useCallback(id => history.push(routePath.comics.workDetail.replace(':id', id)), [history])

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.comicsWork)}
        buttonList={buttonList}
      />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        theadList={theadList}
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
