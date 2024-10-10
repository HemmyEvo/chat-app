import { Card } from '@/components/ui/card'
import React from 'react'

const ConversationFallback = () => {
  return (
    <div className='hidden lg:flex h-full w-full p-2  items-center justify-center bg-secondary text-secondary-foreground'>
        Select/Start a conversation to get started!
    </div>
  )
}

export default ConversationFallback