import React from 'react'
import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
type Props = {
    id: Id<"conversations">; 
    name: string;
    lastMessageSender?: string;
    lastMessageContent?: string;
}

const GroupConversationItems = ({id, name, lastMessageContent,lastMessageSender}: Props) => {
  return (
  <Link href={`/conversations/${id}`} className='w-full'>
    <Card className='p-2 flex flex-row items-center gap-4 truncate'>
       <div className="flex flex-row gap-4 items-center truncate">
          <Avatar>
            <AvatarFallback>
                {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className='truncate'>
              {name}
            </h4>
            {lastMessageSender && lastMessageContent ? <span className='text-xs text-muted-foreground truncate overflow-ellipsis'>
              <p className='font-semibold'>
                {lastMessageSender}
                {":"}&nbsp;
                {lastMessageContent}
              </p>
            </span> : <p className='truncate text-sm text-muted-foreground'>
              Start the Conversation!
            </p>}
          </div>
       </div>
    </Card>
  </Link>
)
}

export default GroupConversationItems