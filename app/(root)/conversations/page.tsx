import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Conversationspage = (props: Props) => {
  return <ConversationFallback />
}

export default Conversationspage