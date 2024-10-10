import React from 'react'
import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {  Check, User } from 'lucide-react';
type Props = {
    id: Id<"conversations">;
    imageUrl: string;
    username: string;
    lastMessageSender?: string;
    lastMessageContent?: string;
}

const DMConversationItems = ({id, imageUrl, username, lastMessageContent,lastMessageSender}: Props) => {
  return (
  <Link href={`/conversations/${id}`} className='w-full '>

    
    <div className="cont flex py-3 cursor-pointer items-center space-x-2">
          <Avatar className='w-8 h-8'>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
        <div className="details flex-1 ">
            <div className="head flex items-center justify-between">
            <p className='name truncate'>{username}</p>
            <p className='text-[12px] capitalize text-green-400 '>yesterday</p>
            </div>
            <div className="message-info  justify-between max-w-[100%] w-full flex items-center  ">
            <div className="time-read relative w-[90%] truncate text-[12px] space-x-2  flex items-center">
              <p><Check className='w-3 text-blue-700 h-3'/></p>
            {lastMessageSender && lastMessageContent ? 
              <p className='font-semibold max-w-[20%] w-full text-xs text-muted-foreground truncate'>
                {lastMessageContent}
              </p>
            : 
            <p className='truncate  max-w-[90%] w-full text-sm text-muted-foreground'>
              Start the Conversation!
            </p>}
                   
            </div>

            <p className='text-[12px] text-right bg-green-400 px-[3px] font-semibold rounded-[50%]'>12</p>
            </div>
        </div>
    </div>
  </Link>
)
}

export default DMConversationItems