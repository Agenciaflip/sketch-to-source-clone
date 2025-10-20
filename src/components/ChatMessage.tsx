import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";
  
  return (
    <div
      className={cn(
        "flex gap-4 p-6 rounded-xl transition-all duration-300",
        isUser ? "bg-secondary/50" : "bg-card/50 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          isUser
            ? "bg-gradient-to-br from-primary to-accent"
            : "bg-gradient-to-br from-accent to-primary"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-semibold text-foreground">
          {isUser ? "You" : "Gemini 3x Blend"}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};
