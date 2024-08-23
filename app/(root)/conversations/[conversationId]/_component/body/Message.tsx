import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    fromCurrentUser: boolean;
    senderImage: string;
    senderName: string;
    lastByUser: boolean;
    content: string[];
    createdAt: number;
    type: string;
    // onDelete: () => void; // Callback function to handle message deletion
};

const Message = ({fromCurrentUser,senderImage,senderName,lastByUser,content,createdAt,type}: Props) => {
    const [open, setOpen] = useState(false);
    // const [longPress, setLongPress] = useState(false);
    // const timerRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (timestamp: number) => {
        return format(timestamp, 'hh:mm a');
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent the default context menu
        if (fromCurrentUser) {
            setOpen(true); // Open the custom dialog
        }
    };

    // const handleTouchStart = () => {
    //     if (fromCurrentUser) {
    //         timerRef.current = setTimeout(() => {
    //             setLongPress(true);
    //             setOpen(true); // Open the custom dialog on long press
    //         }, 500); // Duration for a long press (500 ms)
    //     }
    // };

    // const handleTouchEnd = () => {
    //     if (timerRef.current) {
    //         clearTimeout(timerRef.current);
    //     }
    //     if (longPress) {
    //         setLongPress(false);
    //     }
    // };

    return (
        <div
            className={cn('flex items-end', { 'justify-end': fromCurrentUser })}
            onContextMenu={handleContextMenu} // Right-click event
            // onTouchStart={handleTouchStart} // Long press event
            // onTouchEnd={handleTouchEnd} // End of touch event
        >
            <div
                className={cn('flex flex-col w-full mx-2', {
                    'order-1 items-end': fromCurrentUser,
                    'order-2 items-start': !fromCurrentUser,
                })}
            >
                <div
                    className={cn('px-4 py-2 rounded-lg max-w-[70%]', {
                        'bg-primary text-primary-foreground': fromCurrentUser,
                        'bg-secondary text-secondary-foreground': !fromCurrentUser,
                        'rounded-br-none': !lastByUser && fromCurrentUser,
                        'rounded-bl-none': !lastByUser && !fromCurrentUser,
                    })}
                >
                    {type === 'text' ? (
                        <p className="text-wrap break-words whitespace-pre-wrap">{content}</p>
                    ) : null}
                    <p
                        className={cn('text-xs flex w-full my-1', {
                            'justify-end text-primary-foreground': fromCurrentUser,
                            'justify-start text-secondary-foreground': !fromCurrentUser,
                            'rounded-br-none': !lastByUser && fromCurrentUser,
                            'rounded-bl-none': !lastByUser && !fromCurrentUser,
                        })}
                    >
                        {formatTime(createdAt)}
                    </p>
                </div>
                {/* <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                        
                            <DialogDescription className=' self-start'>
                               Delete message?
                            </DialogDescription>
                        </DialogHeader>
      
                        <Button
                              
                                className='font-semibold w-fit h-fit hover:bg-transparent bg-transparent place-self-end text-secondary-foreground'
                                onClick={() => {
                                    onDelete(); // Call the delete handler
                                    setOpen(false); // Close the dialog
                                }}
                            >
                                Delete for me Everybody
                            </Button>
                        <Button
                              
                              size="sm"
                                className='font-semibold w-fit h-fit hover:bg-transparent bg-transparent place-self-end text-secondary-foreground'
                                onClick={() => {
                                    onDelete(); // Call the delete handler
                                    setOpen(false); // Close the dialog
                                }}
                            >
                                Delete for me
                            </Button>
                   
                                
                    </DialogContent>
                </Dialog> */}
            </div>

            <Avatar
                className={cn('relative w-8 h-8', {
                    'order-2': fromCurrentUser,
                    'order-1': !fromCurrentUser,
                    'invisible': lastByUser,
                })}
            >
                <AvatarImage src={senderImage} />
                <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default Message;
