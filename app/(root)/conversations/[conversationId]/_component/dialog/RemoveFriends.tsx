"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hook/useMutationState'
import { ConvexError } from 'convex/values'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

type Props = {
    conversationId : Id<"conversations">,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveFriends = ({conversationId, open, setOpen}: Props) => {
    const {mutate:removeFriend ,pending} = useMutationState(api.friend.remove);
    const handleRemoveFriend = async () =>{
        removeFriend({conversationId})
        .then(()=>{
            toast.success("Removed Friend")
        })
        .catch(err => {
            toast.error(err instanceof ConvexError 
                ? err.data 
                : "Unexpected error occurred")
        })
    }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. All messages will be deleted and you will not be able to message this user. All group chats will still work as normal
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={pending}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveFriends