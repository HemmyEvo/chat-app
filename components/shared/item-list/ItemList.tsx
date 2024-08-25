"use client"
import { Card } from '@/components/ui/card';
import { useConversation } from '@/hook/useConversation';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    title: string;
    action?: React.ReactNode;

}>

const ItemList = ({children, title, action:Action}: Props) => {
    const {isActive} = useConversation();
  return (
   <Card className={cn("hidden min-h-full w-full lg:w-80 lg:flex-none p-2", {
        block : !isActive,
        "lg:block" : isActive,
   })}>
    <div className="mb-4 flex items-center justify-between">
        <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
        {Action ? Action : null}
    </div>
    <div className="w-full h-full justify-start flex-col item-center flex gap-2">
        {children}
    </div>
   </Card>
  )
}

export default ItemList