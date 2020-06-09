import React, { useMemo, useContext, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import { BREADCRUMBS } from '../utils'
import subscriptionMessages from '../../messages'
import messages from '../messages'
import SubscriptionProductContext, { ActionContext } from '../context/SubscriptionProductContext'

export default function SubscriptionProductDetail() {
  const { onGetSubscriptionProduct, onResetSubscriptionProduct, onDeleteSubscriptionProduct } = useContext(
    ActionContext
  )
  const { currentSubscriptionProduct = {} } = useContext(SubscriptionProductContext)
  const { subscriptionId, id } = useParams()
  const { formatMessage } = useIntl()
  const history = useHistory()
  const titleText = formatMessage(messages.detail)

  useEffect(() => {
    onGetSubscriptionProduct(id!)
    return () => onResetSubscriptionProduct()
  }, [onGetSubscriptionProduct, onResetSubscriptionProduct, id])

  const handleEdit = useCallback(
    () =>
      history.push(
        routePath.comics.subscriptionProductEdit.replace(':subscriptionId', subscriptionId!).replace(':id', id!)
      ),
    [history, subscriptionId, id]
  )

  const handleDelete = useCallback(() => {
    onDeleteSubscriptionProduct(id!)
  }, [onDeleteSubscriptionProduct, id])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route: route?.replace(':id', subscriptionId!)
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText, subscriptionId]
  )

  const buttonList = useMemo(
    () => [
      <Button theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.editStart)} onClick={handleEdit} />,
      <Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIcon} onClick={handleDelete} />
    ],
    [formatMessage, handleEdit, handleDelete]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.application), currentSubscriptionProduct.app),
          toDataSet(formatMessage(subscriptionMessages.productId), currentSubscriptionProduct.productId),
          toDataSet(formatMessage(subscriptionMessages.monthlyFee), currentSubscriptionProduct.monthlyFee),
          toDataSet(formatMessage(messages.status), currentSubscriptionProduct.status),
          toDataSet(formatMessage(commonMessages.publicStartTime), currentSubscriptionProduct.publicStartTime),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentSubscriptionProduct.publicEndTime),
          toDataSet(formatMessage(commonMessages.createDateTime), currentSubscriptionProduct.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentSubscriptionProduct.updateAt)
        ]}
      />
    </>
  )
}
