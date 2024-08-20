import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import { useMutationState } from '@/hook/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
import { CirclePlus } from 'lucide-react'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {}

const createGroupFormSchema = z.object({
  name: z
  .string()
  .min(1,{message : "This field can't be empty"}),
  members: z
  .string()
  .array()
  .min(1,{message : "You must select at least 1 friend"})
})
const CreateGroupDialogue = (props: Props) => {
  const friends = useQuery(api.friends.get)
  const {mutate: createGroup, pending} = useMutationState(api.conversation.createGroup)
  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
        name: "",
        members: []
    }
    })
  const members = form.watch("members", [])
  const unselectedFriends = useMemo(() =>{
    return friends ? friends.filter(friend => !members.includes(friend._id)) : []
  },[members.length, friends?.length])
  const handleSubmit = async(values: z.infer<typeof createGroupFormSchema>) =>{
    await createGroup({name: values.name, members: values.members})
    .then(()=>{
        form.reset()
        toast.success("Friend request sent")
    })
    .catch(err => {
        toast.error(err instanceof ConvexError 
            ? err.data 
            : "Unexpected error occurred")
    })

 }
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger asChild>
              <CirclePlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className='block'>
        <DialogHeader>
          <DialogTitle>
            Create Group
          </DialogTitle>
          <DialogDescription>
            Add your friends to get started!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                    <FormField control={form.control} name='name' render={({field}) =>
                    {
                      return(
                     
                      <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input placeholder='Group Name...' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                      
                    
                      )
                    }
                    }/>
                   
                    <FormField control={form.control} name='name' render={({}) =>
                    {
                      return(
                     
                      <FormItem>
                        <FormLabel>
                            Friends
                        </FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                              <Button className='w-full' variant='outline'>Select</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-full'>
                              {
                                unselectedFriends.map(friend => {
                                  return(
                                    <DropdownMenuCheckboxItem key={friend._id} className='items-center gap-2 w-full p-2' onCheckedChange={checked => {
                                      if(checked){
                                        form.setValue("members", [...members, friend._id])
                                      }
                                    }}></DropdownMenuCheckboxItem>
                                  )
                                })
                              }
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                      
                    
                      )
                    }
                    }/>
                   
                </form>
            </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupDialogue