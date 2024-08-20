"use client"
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'
import AddFriendDialog from './_component/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Request from './_component/Request'

const Friendspage = () => {
  const requests = useQuery(api.requests.get)
  return (
    <>
    <ItemList title='Friends' action={<AddFriendDialog />}>
    {
      requests ? requests.length === 0 ? <p className='h-full w-full flex items-center justify-center'>No friend requests found</p> : requests.map(request => (
        <Request 
        key={request.request._id} 
        id={request.request._id}
        username={request.sender.username}
        imageUrl={request.sender.imageUrl}
        email={request.sender.email}
        />
      )) : <Loader2 className='h-8 w-8' />
    }
    </ItemList>
    <ConversationFallback />
    </>
    
  )
}

export default Friendspage