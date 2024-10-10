'use client'
import SettingsItem from '@/components/shared/item-list/SettingsItemList'
import React, { PropsWithChildren } from 'react'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LucideMessageCircleQuestion, Pencil, QrCode, ScrollText, UserPen } from 'lucide-react';
import { useUser } from '@clerk/nextjs'
type Props = PropsWithChildren<{}>

const layout = ({children}: Props) => {
    const {user} = useUser();
    const Links = [
        {icon:<UserPen />, label:'Edit Profile', path:'/settings/profile'},
        {icon:<LucideMessageCircleQuestion />, label:'Help', path:'/settings/help'},
        {icon:<ScrollText/>, label:'About', path:'/settings/about'},
    ]
  return (
        <>
    <SettingsItem title='Settings'>
    <div className='px-3 py-3 flex items-center justify-between border-b border-[gray]'>
        <div className="profile-details flex items-center space-x-4">
        <div className="profile cursor-pointer h-12 overflow-hidden p-1 w-12 bg-[#b9b9b9] rounded-full">
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
                    {user?.fullName?.substring(0,1)}
            </AvatarFallback>
        </Avatar>
        </div>
        <div className="details">
            <p className="name dark:text-white text-black">_NO_Existo</p>
            <p className="number text-[12px] text-[#c4c4c4]">+234 706 203 0169</p>
            <p className="about text-[12px] text-[#c4c4c4]">Hello :)</p>
        </div>
        </div>

        <div className="icon flex items-center text-green-400 space-x-4">
            <div className="Qr-code cursor-pointer text-[25px]">
                < QrCode />
            </div>
            <div className="arrow cursor-pointer text-[25px]">
               <ThemeToggle />
            </div>
        </div>
    </div>
    <div className="items-cont flex items-center px-3 py-4">
        <div className="space-y-6">  
        {Links.map((link,i) => {
         return(
          
              <div key={i} className="flex items-center space-x-4">
                <div className="icon">
                    {link.icon}
                </div>
                <div className="label">
                    <Link href={link.path}>{link.label}</Link>
                </div>
            </div>
         )
        })}
        </div>
    </div>
    </SettingsItem>
        {children}
        </>

  )
}

export default layout