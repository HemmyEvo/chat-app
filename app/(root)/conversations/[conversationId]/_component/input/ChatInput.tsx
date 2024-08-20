"use client"

import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hook/useConversation'
import { useMutationState } from '@/hook/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import TextareaAutoSize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty"
  })
})

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { conversationId } = useConversation()
  const { mutate: createMessage, pending } = useMutationState(api.message.create)
  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  })
  const [showPicker, setShowPicker] = useState(false)

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;
    if (selectionStart !== null) {
      form.setValue("content", value)
    }
  }

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [values.content]
    })
      .then(() => {
        form.reset()
      })
      .catch(err => {
        toast.error(err instanceof ConvexError
          ? err.data
          : "Unexpected error occurred")
      })
  }

  const onEmojiClick = (event: React.MouseEvent, emojiObject: any) => {
    form.setValue("content", form.getValues("content") + emojiObject.emoji)
    setShowPicker(false)
  }

  return (
    <Card className='w-full p-2 rounded-lg relative'>
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2 items-end w-full'>
            <FormField control={form.control} name='content' render={({ field }) => {
              return <FormItem className='h-full w-full'>
                <FormControl>
                  <TextareaAutoSize
                    onKeyDown={async e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        await form.handleSubmit(handleSubmit)()
                      }
                    }}
                    rows={1}
                    maxRows={3}
                    {...field}
                    onChange={handleInputChange}
                    onClick={handleInputChange}
                    placeholder='Type a message...'
                    className='min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }} />
            <Button
              type='button'
              onClick={() => setShowPicker(!showPicker)}
              size="icon"
            >
              <Smile />
            </Button>
            {showPicker && (
              <div className='absolute bottom-16 left-2'>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <Button disabled={pending} size="icon" type='submit'>
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default ChatInput
