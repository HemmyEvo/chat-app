"use client"
import ItemList from '@/components/shared/item-list/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React from 'react'
import DMConversationItems from './_components/DMConversationItems'
import CreateGroupDialogue from './_components/CreateGroupDialogue'
import GroupConversationItems from './_components/GroupConversations'

type Props = React.PropsWithChildren<{}>

const Conversationslayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get,{
  }) 

  return (
  <>
  <ItemList title='Conversations' action={<CreateGroupDialogue />}>{
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
  }</ItemList>
  {children}
  </>)
}

export default Conversationslayout