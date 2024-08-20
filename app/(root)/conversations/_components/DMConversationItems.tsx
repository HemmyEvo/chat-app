import React from 'react'
import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
type Props = {
    id: Id<"conversations">;
    imageUrl: string;
    username: string;
    lastMessageSender?: string;
    lastMessageContent?: string;
}

const DMConversationItems = ({id, imageUrl, username, lastMessageContent,lastMessageSender}: Props) => {
  return (
  <Link href={`/conversations/${id}`} className='w-full'>
    <Card className='p-2 flex flex-row items-center gap-4 truncate'>
       <div className="flex flex-row gap-4 items-center truncate">
          <Avatar>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className='truncate'>
              {username}
            </h4>
            {lastMessageSender && lastMessageContent ? <span className='text-xs text-muted-foreground truncate overflow-ellipsis'>
              <p className='font-semibold'>
                {lastMessageSender}
                {":"}&nbsp;
              </p>
              <p className="truncate overflow-ellipsis">{lastMessageContent}</p>
            </span> : <p className='truncate text-sm text-muted-foreground'>
              Start the Conversation!
            </p>}
          </div>
       </div>
    </Card>
  </Link>
)
}

export default DMConversationItems