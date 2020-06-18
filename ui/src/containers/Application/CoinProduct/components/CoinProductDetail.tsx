import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import Button, { Theme } from '@src/components/Button/Button'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { ScrollAnchor } from './CoinProductForm'
import CoinProductContext, { ActionContext } from '../context/CoinProductContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import messages from '../messages'
import { CoinProductKeys } from '@src/models/application/coinProduct'

export default function CoinProductDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentProduct } = useContext(CoinProductContext)
  const { onGetCoinProduct, onResetCoinProduct } = useContext(ActionContext)

  useEffect(() => {
    onGetCoinProduct(id!)
    return () => onResetCoinProduct()
  }, [onGetCoinProduct, id, onResetCoinProduct])

  const titleText = formatMessage(messages.coinProductDetail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.editStart)}
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

  return !currentProduct ? null : (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(messages.productId), currentProduct[CoinProductKeys.Id]),
          toDataSet(formatMessage(applicationMessages.applicationId), currentProduct[CoinProductKeys.AppId]),
          toDataSet(formatMessage(messages.paidCoin), currentProduct[CoinProductKeys.PayCoin]),
          toDataSet(formatMessage(messages.givenCoin), currentProduct[CoinProductKeys.PayBonusCoin]),
          toDataSet(
            formatMessage(applicationMessages.status),
            formatMessage(messages[currentProduct[CoinProductKeys.Status]])
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), currentProduct[CoinProductKeys.InsertedAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentProduct[CoinProductKeys.UpdatedAt])
        ]}
        marginBottom
        onEdit={handleRedirect()}
      />
      <DataTable
        title={formatMessage(commonMessages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.publicStartTime), currentProduct[CoinProductKeys.PublishBeginAt]),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentProduct[CoinProductKeys.PublishEndAt])
        ]}
        onEdit={handleRedirect(ScrollAnchor.Release)}
      />
    </>
  )
}
