import React from 'react'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function Home() {
  const { formatMessage } = useIntl()
  return <Link to='/test'>{formatMessage(messages.title)}</Link>
}
