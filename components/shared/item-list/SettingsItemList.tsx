"use client"
import { useSettings } from '@/hook/useNavigationId';
import { cn } from '@/lib/utils';
import {ArrowLeft} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren} from 'react'

type Props = PropsWithChildren<{
    title: string;
    action?: React.ReactNode;

}>

const SettingsItem = ({children, title}: Props) => {
    const {isActive} = useSettings();
    const router = useRouter()
  
  return (
   <div className={cn("hidden relative overflow-scroll no-scrollbar h-full w-full lg:w-80 lg:flex-none ", {
        block : !isActive,
        "lg:block" : isActive,
   })}>
    
    
    <div className=' flex justify-between items-center px-3 py-4 '>
    <div className="flex space-x-5 items-center cursor-pointer" onClick={() => router.push('/conversations')}>
    <ArrowLeft/>
    <p>{title}</p>
    </div>
    </div>
    <div className="w-full h-full justify-start flex-col item-center flex gap-2">
        {children}
    </div>
   </div>
  )
}

export default SettingsItem