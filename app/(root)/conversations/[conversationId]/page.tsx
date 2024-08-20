"use client"
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import Header from './_component/Header'
import Body from './_component/body/Body'
import ChatInput from './_component/input/ChatInput'
import RemoveFriends from './_component/dialog/RemoveFriends'
import DeleteGroup from './_component/dialog/DeleteGroup'

type Props = {
  params:{
    conversationId: Id<"conversations">
  }
}

const Conversationpage = ({params: {conversationId}}: Props) => {
  const conversation = useQuery(api.conversation.get, {id:conversationId})
  const [removeFriends, setRemoveFriends] = useState(false)
  const [leaveGroup, setLeaveGroup] = useState(false)
  const [deleteGroup, setDeleteGroup] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video" | null>(null)
  return conversation === undefined 
      ? 
      <div className="w-full h-full flex justify-center items-center">
      <Loader className='h-8 w-8 animate-spin' />
      </div>
      : conversation === null 
          ?
          <p className="w-full h-full flex justify-center items-center">
          Conversation not found
          </p>
          :
          <ConversationContainer>
            <RemoveFriends conversationId={conversationId} open={removeFriends} setOpen={setRemoveFriends} />
            <DeleteGroup conversationId={conversationId} open={deleteGroup} setOpen={setDeleteGroup} />
            <Header 
            name={(conversation.isGroup ? conversation.name : conversation?.otherMember?.username )|| ""}
            imageUrl={conversation.isGroup ? undefined : conversation?.otherMember?.imageUrl}
            options={conversation.isGroup ? [
              {
                label: "Leave group",
                destructive: false,
                onClick: () => setLeaveGroup(true)
              },
              {
                label: "Delete group",
                destructive: true,
                onClick: () => setDeleteGroup(true)
              },
            
            ] :  [
              {
                label: "Remove Friends",
                destructive: true,
                onClick: () => setRemoveFriends(true)
              },
          
            
            ]}
            />
            <Body/>
            <ChatInput />
            
          </ConversationContainer>
    
  
}

export default Conversationpage