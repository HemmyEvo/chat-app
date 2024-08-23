"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigation } from "@/hook/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DesktopNavbar = () => {
    const paths = useNavigation()
  return (
  <Card className="hidden lg:flex lg:flex-col justify-between items-center h-full w-16 px-2 py-4">
    <nav>
        <ul className="flex flex-col items-center gap-4">
            {paths.map((path, id)=>{
                return (
                <li key={id} className="relative">
                    <Link href={path.href}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                            size="icon"
                            variant={path.active ? "default": "outline"}
                            >
                                {path.icon}
                                {path.count 
                                ?(
                                <Badge className="left-6 absolute px-2 bottom-7">{path.count}</Badge>
                                ) 
                                : null}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{path.name}</p>
                        </TooltipContent>
                    </Tooltip>
                    </Link>
                </li>
            )
            })}
        </ul>
    </nav>
    <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
    </div>
  </Card>
  )
}

export default DesktopNavbar