import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ListTable from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { SubscriptionKeys } from '@src/models/comics/subscription'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { usePaging } from '@src/hooks'
import { routePath } from '@src/common/appConfig'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'
import SubscriptionContext, { ActionContext } from '../context/SubscriptionContext'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-2': {
      width: 240
    }
  }
})

export default function SubscriptionList() {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { subscriptionList, subscriptionTotal } = useContext(SubscriptionContext)
  const { onGetSubscriptionList } = useContext(ActionContext)
  const { pagination, handlePageChange } = usePaging({ total: subscriptionTotal })

  useEffect(() => {
    onGetSubscriptionList()
  }, [onGetSubscriptionList])

  const breadcrumbList = BREADCRUMBS.map(({ title }) => ({
    title: formatMessage(title)
  }))

  const theadList = useMemo(
    () => [
      { id: SubscriptionKeys.InsertedAt, label: formatMessage(commonMessages.createDateTime) },
      { id: SubscriptionKeys.ID, label: formatMessage(commonMessages.id) },
      { id: SubscriptionKeys.Name, label: formatMessage(commonMessages.subscriptionName) },
      { id: SubscriptionKeys.PublishBegin, label: formatMessage(commonMessages.publicStartTime) },
      { id: SubscriptionKeys.PublishEnd, label: formatMessage(commonMessages.publicEndTime) },
      { id: 'spacer', label: '' }
    ],
    [formatMessage]
  )

  const buttonList = [
    <Button
      theme={Theme.DARK_BORDER}
      buttonText={formatMessage(messages.createStart)}
      onClick={() => history.push(routePath.comics.subscriptionCreation)}
      icon={IconEdit}
    />
  ]

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <ListTable
        classnames={classes.table}
        theadList={theadList}
        dataList={subscriptionList}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback((id: string) => history.push(routePath.comics.subscriptionDetail.replace(':id', id!)), [
          history
        ])}
        noMarginTop
      />
    </>
  )
}
