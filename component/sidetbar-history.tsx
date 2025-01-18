import type {chat} from '@/libs/db/schema'
import useSWR from 'swr';
import { memo, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { User } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/downdrop"
import { fetches } from '@/libs/utils';
import Link from "next/link";
import type { Chat } from '@/lib/db/schema';


const PureChatItem = ({
    chat,
    isActive,
    onDelete,
    setOpenMobile,
  }: {
    chat: Chat;
    isActive: boolean;
    onDelete: (chatId: string) => void;
    setOpenMobile: (open: boolean) => void;
  }) => {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
            <span>{chat.title}</span>
          </Link>
        </SidebarMenuButton>
  
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5"
              showOnHover={!isActive}
            >
              <MoreHorizontalIcon />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
              onSelect={() => onDelete(chat.id)}
            >
              <TrashIcon />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  };
  
  export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
    if (prevProps.isActive !== nextProps.isActive) return false;
    return true;
    });

  export function SidebarHistory({ user }: { user: User | undefined }) {
    const { id } = useParams();
    const pathname = usePathname();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const {
      data:history,
      mutate, isLoading} = useSWR<Array<Chat>>(user? 'api/history' : null, fetches, {fallbackdata:[]});
    
    const router = useRouter();
    useEffect(() => {
      mutate();
    }, [pathname, mutate]);
    const deletchat = async() => {

    }

    if (!user) {
      return (
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
              Login to save and revisit previous chats!
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

    if (isLoading) {
      return (
        <SidebarGroup>
          <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
            Today
          </div>
          <SidebarGroupContent>
            <div className="flex flex-col">
              {[44, 32, 28, 64, 52].map((item) => (
                <div
                  key={item}
                  className="rounded-md h-8 flex gap-2 px-2 items-center"
                >
                  <div
                    className="h-4 rounded-md flex-1 max-w-[--skeleton-width] bg-sidebar-accent-foreground/10"
                    style={
                      {
                        '--skeleton-width': `${item}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

  }