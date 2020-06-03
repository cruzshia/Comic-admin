import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import ListTable from '@src/components/table/ListTable'
import usePaging from '@src/hooks/usePaging'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import SubscriptionContext, { ActionContext } from '../context/SubscriptionContext'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'

export default function SubscriptionDetail() {
  const { onGetSubscription, onResetSubscription } = useContext(ActionContext)
  const { currentSubscription = {} } = useContext(SubscriptionContext)
  const { pagination, handlePageChange } = usePaging({ total: 1 })
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    onGetSubscription(id!)
    return () => onResetSubscription()
  }, [onGetSubscription, onResetSubscription, id])

  const titleText = formatMessage(messages.subscriptionDetail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const handleEdit = useCallback(() => history.push(routePath.comics.subscriptionEdit.replace(':id', id!)), [
    history,
    id
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.editStart)}
        onClick={handleEdit}
      />
    ],
    [formatMessage, handleEdit]
  )

  const theadList = useMemo(
    () => [
      { id: 'appId', label: formatMessage(commonMessages.appId) },
      { id: 'productId', label: formatMessage(messages.productId) },
      { id: 'publicStartTime', label: formatMessage(commonMessages.publicStartTime) },
      { id: 'publicEndTime', label: formatMessage(commonMessages.publicEndTime) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
  )

  const tableButtons = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.createStart)}
        onClick={() => history.push(routePath.comics.subscriptionProductCreation.replace(':subscriptionId', id!))}
        icon={IconEdit}
      />
    ],
    [formatMessage, history, id]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.jumpSubscription)}
        buttonList={buttonList}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentSubscription.id),
          toDataSet(formatMessage(messages.name), currentSubscription.name),
          toDataSet(formatMessage(messages.subscriptionImage), <img src={currentSubscription.image} alt='' />),
          toDataSet(formatMessage(commonMessages.publicStartTime), currentSubscription.publicStartTime),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentSubscription.publicEndTime),
          toDataSet(formatMessage(commonMessages.createDateTime), currentSubscription.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentSubscription.updateAt)
        ]}
        marginBottom
      />
      <ListTable
        theadList={theadList}
        buttonList={tableButtons}
        rowIdKey='appId'
        dataList={[
          {
            appId: '少年ジャンプ+ for iOS',
            productId: 'SHSA_JP01WJ029931M001_57',
            publicStartTime: '2019-12-20 22:00',
            publicEndTime: '2019-12-20 22:00'
          }
        ]}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  )
}
