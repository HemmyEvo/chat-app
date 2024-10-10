"use client"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader, MessageSquarePlusIcon } from 'lucide-react'
import React from 'react'
import DMConversationItems from './_components/DMConversationItems'
import CreateGroupDialogue from './_components/CreateGroupDialogue'
import GroupConversationItems from './_components/GroupConversations'
import HomeItemList from '@/components/shared/item-list/HomeItemList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = React.PropsWithChildren<{}>

const Conversationslayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get,{
  }) 

  return (
  <>
  <HomeItemList title='Chats' action={<CreateGroupDialogue />}>
    <div className="overflow-y-scroll  no-scrollbar">
    {
    conversations 
    ? 
    (
      conversations.length === 0 
        ? 
        (
        <p className='flex justify-center items-center w-full h-full'>No conversations found</p> 
        )
        : 
        (
          
        conversations.map((conversations) =>{
        return conversations.conversation.isGroup 
          ? 
          <GroupConversationItems 
          key={conversations.conversation._id}
          id={conversations.conversation._id} 
          name={conversations.conversation.name || ""} 
          lastMessageContent={conversations.lastMessage?.content}
          lastMessageSender={conversations.lastMessage?.sender}
          />
          : 
          (
          <DMConversationItems 
              key={conversations.conversation._id}
              id={conversations.conversation._id} 
              username={conversations.otherMember?.username || ""} 
              imageUrl={conversations.otherMember?.imageUrl || ""}
              lastMessageContent={conversations.lastMessage?.content}
              lastMessageSender={conversations.lastMessage?.sender}
              />
          )
          } 
          )
        ) 
    )
    :
    (
    <Loader className=' animate-spin'/>
    )
  }
   <Link href={'/'}>
   <Button size='icon' className="absolute bottom-10 right-0">
    <MessageSquarePlusIcon/>
    </Button>
   </Link>
    </div>
  </HomeItemList>
  {children}
  </>)
}

export default Conversationslayout