import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export const Sidebar = ({
  conversations,
  activeConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps) => {
  return (
    <div className="w-80 border-r border-border bg-card/30 backdrop-blur-sm flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200",
                "hover:bg-secondary/50",
                activeConversation === conv.id
                  ? "bg-secondary/70"
                  : "bg-transparent"
              )}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {conv.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conv.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
