import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import { ScrollAnchor } from './CoinProductForm'
import applicationMessages from '../../messages'
import CoinProductContext from '../context/CoinProductContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CoinProductDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentProduct } = useContext(CoinProductContext)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.coinProductDetail),
          route: undefined
        }
      ]),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.edit)}
        onClick={() => {
          history.push(routePath.application.coinProductEdit.replace(':id', id!))
        }}
      />
    ],
    [formatMessage, history, id]
  )

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(
        routePath.application.coinProductEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')
      ),
    [history, id]
  )

  const handleEdit = useCallback(() => handleRedirect(), [handleRedirect])

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.coinProductDetail)}
        buttonList={buttonList}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(messages.productId), currentProduct.productId),
          toDataSet(formatMessage(applicationMessages.applicationId), currentProduct.applicationId),
          toDataSet(formatMessage(messages.paidCoin), currentProduct.paidCoin),
          toDataSet(formatMessage(messages.givenCoin), currentProduct.givenCoin),
          toDataSet(formatMessage(applicationMessages.status), currentProduct.status),
          toDataSet(formatMessage(commonMessages.createDateTime), currentProduct.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentProduct.updatedAt)
        ]}
        marginBottom
        onEdit={handleEdit}
      />
      <DataTable
        title={formatMessage(messages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(messages.releaseStartTime), currentProduct.releaseStartTime),
          toDataSet(formatMessage(messages.releaseEndTime), currentProduct.releaseEndTime)
        ]}
        onEdit={handleRedirect(ScrollAnchor.Release)}
      />
    </>
  )
}
