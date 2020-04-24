import React, { useMemo, useRef, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { successSubject } from '@src/utils/responseSubject'
import { routePath } from '@src/common/appConfig'
import { CoinProductActionType } from '@src/reducers/application/coinProduct/coinProductActions'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import CoinProductForm from './CoinProductForm'
import CoinProductContext, { ActionContext } from '../context/CoinProductContext'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function CoinProductEdit() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const history = useHistory()
  const { currentProduct } = useContext(CoinProductContext)
  const { onUpdateCoinProduct, onGetCoinProduct } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetCoinProduct(id!)
  }, [onGetCoinProduct, id])

  useEffect(() => {
    const subscription = successSubject.subscribe([CoinProductActionType.UPDATE_SUCCESS], () =>
      history.push(routePath.application.coinProductDetail + id)
    )
    return () => subscription.unsubscribe()
  }, [history, id])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.creation),
          route: undefined
        }
      ]),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <CoinProductForm onSubmit={onUpdateCoinProduct} coinProduct={currentProduct} formRef={formRef} />
    </>
  )
}
