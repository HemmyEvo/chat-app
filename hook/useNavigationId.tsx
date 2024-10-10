"use client"

import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/router";
import { useMemo } from "react";

export const useConversation = () => {
 const params = useParams();
 const conversationId = useMemo(() => params?.conversationId || ("" as string),[params?.conversationId]) 
 const isActive = useMemo(() => !!conversationId, [conversationId])
    return {
        isActive,
        conversationId
    }
}
export const useSettings = () => {
    const params = useParams();
    const pathname = usePathname();  // Get the current pathname
    const settingsId = useMemo(() => params || '', [params]);

    // Determine if the current path matches any specific settings page
    const isActive = useMemo(() => {
        const pathSegments = pathname.split('/'); // Split the path into segments
        const lastSegment = pathSegments[pathSegments.length - 1]; // Get the last segment of the path
        return !!settingsId && ['help', 'about', 'profile'].includes(lastSegment); // Check if the last segment matches
    }, [settingsId, pathname]);

    return {
        isActive,
        settingsId,
    };
};

