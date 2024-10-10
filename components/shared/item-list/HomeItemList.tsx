"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useConversation } from '@/hook/useNavigationId';
import { cn } from '@/lib/utils';
import { SignedIn, SignOutButton, useUser } from '@clerk/nextjs';
import { Archive, Camera, LogOut, LucideSearch, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren, useState } from 'react'

type Props = PropsWithChildren<{
    title: string;
    action?: React.ReactNode;

}>

const HomeItemList = ({children, title}: Props) => {
    const {isActive} = useConversation();
    const {user} = useUser();
    const [chatSettings, setChatSettings] = useState(false)
    const HandleClick = () =>{
        if(!chatSettings){
            setChatSettings(true)
        }
        else{
            setChatSettings(false)
        }
    }
  
  return (
   <div className={cn("hidden relative overflow-hidden  h-full w-full lg:w-80 lg:flex-none ", {
        block : !isActive,
        "lg:block" : isActive,
   })}>
    
    
    <div className=' flex justify-between items-center px-1 py-2'>
    <div className="flex space-x-5 items-center">
    <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                    {user?.fullName?.substring(0,1)}
                </AvatarFallback>
            </Avatar>

    
    <p>{title}</p>
    </div>

    <div className="flex space-x-4 items-center">
    <Tooltip>
        <TooltipTrigger>
        <Camera className='text-[20px]  cursor-pointer'/>
        </TooltipTrigger>
        <TooltipContent>
          <p>Camera</p>
        </TooltipContent>
      </Tooltip>

    <Tooltip>
        <TooltipTrigger>
        <MoreVertical onClick={HandleClick} className='text-[20px] cursor-pointer'/>
        </TooltipTrigger>
        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>

    </div>
    {
    chatSettings && 
    <div className='absolute drop-shadow-lg shadow-md dark:bg-black bg-white text-[14px] px-3 py-3 space-y-3 z-20 right-0 top-12 '>
        <p className='cursor-pointer'>New group</p>
        <p className='cursor-pointer'><Link href={'/settings'}>Settings</Link></p>
       <SignedIn>
        <SignOutButton>
        <p className='cursor-pointer space-x-4 flex items-center'><span>Sign Out</span> <span><LogOut className='w-4 h-4'/></span> </p>
        </SignOutButton>
       </SignedIn>
    </div>
    }

</div>

<div className='search-cont py-2 space-y-4'>

<div className="search w-full  py-2 px-5 space-x-3 rounded-full   flex items-center">
<div className="search-icon">
        <LucideSearch className='text-[20px]'/>
    </div>
    <form action="" className='flex-1'>
        <input type="text" placeholder='Search...' className='w-full bg-transparent placeholder:text-[#d1d1d1]    outline-none' />
    </form>
   
</div>


<div className="filter-by flex w-full items-center text-[12px] space-x-2">

<p className="filter-active  px-3 cursor-pointer py-1 text-center rounded-full ">
    All
</p>

<p className="  px-3 cursor-pointer py-1 text-center rounded-full ">
    Unread
</p>

<p className="  px-3 cursor-pointer py-1 text-center rounded-full ">
    Favourites
</p>

<p className="  px-3 cursor-pointer py-1 text-center rounded-full ">
    Groups
</p>
</div>
<div className="archived flex cursor-pointer px-1  w-full items-center justify-between">
<div className="icon-label flex items-center space-x-3">
    <p><Archive className='w-4 h-4'/></p>
    <p>Archived</p>
</div>
<div className="amount">
    <p className=' text-green-400 text-[13px]'>32</p>
</div>

</div>



</div>
    <div className="w-full h-full justify-start flex-col item-center flex gap-2">
        {children}
    </div>
   </div>
  )
}

export default HomeItemList