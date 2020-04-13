import React, { useMemo, useRef, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import CoinProductForm from './CoinProductForm'
import CoinProductContext from '../context/CoinProductContext'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function CoinProductEdit() {
  const { formatMessage } = useIntl()
  const { currentProduct } = useContext(CoinProductContext)
  const formRef = useRef<HTMLFormElement>(null)
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
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
      />
    ],
    [formatMessage]
  )
  const handleSubmit = useCallback(data => console.log(data), [])

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <CoinProductForm onSubmit={handleSubmit} coinProduct={currentProduct} formRef={formRef} />
    </>
  )
}
