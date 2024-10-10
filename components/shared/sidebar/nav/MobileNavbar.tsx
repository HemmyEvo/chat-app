"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useConversation } from "@/hook/useNavigationId";
import { useNavigation } from "@/hook/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const MobileNavbar = () => {
    const paths = useNavigation();
    const {isActive} = useConversation();
  if(isActive) return null;
  return (
  <Card className="fixed bottom-4 lg:hidden w-[calc(100vw-32px)] flex items-center h-16 p-2">
    <nav className="w-full">
        <ul className="flex justify-evenly items-center">
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
                                <Badge className="left-7 absolute px-2 bottom-6">{path.count}</Badge>
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
             <li>
             <ThemeToggle />
            </li>
             <li>
                <UserButton />
            </li>
        </ul>
    </nav>
  </Card>
  )
}

export default MobileNavbar