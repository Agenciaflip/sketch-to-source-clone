import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end gap-2 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 hover:bg-secondary"
        disabled={disabled}
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your documents or for AI assistance..."
        className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        size="icon"
        className="shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
