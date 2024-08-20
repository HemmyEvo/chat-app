import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hook/useMutationState';
import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    id: Id<"requests">;
    email: string;
    imageUrl: string;
    username: string;
}

const Request = ({id, imageUrl, username,email}: Props) => {
    const {mutate: denyReq, pending: denyPending} = useMutationState(api.request.deny)
    const {mutate: acceptReq, pending: acceptPending} = useMutationState(api.request.accept)
  return (
   <Card className='w-full p-2 flex items-center justify-between flex-row gap-2'>
    <div className="flex truncate items-center gap-4">
        <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
                <User />
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <div className="text-xs text-muted-foreground truncated">{email}</div>
        </div>
    </div>
    
    <div className="flex items-center gap-2">
            <Button size="icon" disabled={denyPending || acceptPending} onClick={() => {
                acceptReq({id})
                .then(() =>{toast.success("Friend request accepted")})
                .catch(err => {
                    toast.error(err instanceof ConvexError 
                        ? err.data 
                        : `${err}Unexpected error occurred`)
                })
            }}><Check /></Button>
            <Button variant="destructive" size="icon" disabled={denyPending || acceptPending} onClick={() => {
                denyReq({id})
                .then(() =>{toast.success("Friend request denied")})
                .catch(err => {
                    toast.error(err instanceof ConvexError 
                        ? err.data 
                        : "Unexpected error occurred")
                })
            }}><X /></Button>
        </div>
   </Card>
  )
}

export default Request