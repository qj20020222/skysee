'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
  } from '@/component/ui/sidebar';

import type { User } from 'next-auth';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { SidebarHistory } from './sidebar-history';
const ChatSideBar = ({ user }: { user: User | undefined }) => {
    return(
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>

        <Tooltip>
        </Tooltip>
    
      </SidebarHeader>

      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
    </Sidebar>

    
    )

}

export default ChatSideBar;