import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ModelSelector, ModelType } from "@/components/ModelSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Welcome to Gemini 3x Blend",
      timestamp: new Date(),
      messages: [],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  const [selectedModel, setSelectedModel] = useState<ModelType>("crag");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [activeConversation?.messages]);

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title:
                conv.messages.length === 0
                  ? content.slice(0, 30) + "..."
                  : conv.title,
            }
          : conv
      )
    );

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'm processing your request using the ${selectedModel.toUpperCase()} technique. This is a demo response showing how Gemini 3x Blend would enhance accuracy through:\n\n${
          selectedModel === "crag"
            ? "• Corrective Retrieval Augmented Generation\n• Quality assessment of retrieved documents\n• Web search augmentation for expanded information"
            : selectedModel === "llm-blender"
            ? "• PairRanker for comparing candidate outputs\n• GenFuser for merging top-ranked responses\n• Cross-attention encoders for quality determination"
            : "• Breaking down complex problems into steps\n• Self-composed reasoning structures\n• Systematic approach to problem-solving"
        }\n\nYour question: "${content}"`,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      timestamp: new Date(),
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (id === activeConversationId && filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          conversations={conversations}
          activeConversation={activeConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={setActiveConversationId}
          onDeleteConversation={handleDeleteConversation}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
                {activeConversation && activeConversation.messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4 max-w-2xl mx-auto p-8">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                        <Sparkles className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground">
                        Welcome to Gemini 3x Blend
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        Experience enhanced AI accuracy through advanced techniques:
                        CRAG, LLM-Blender, and Self-Discover reasoning.
                      </p>
                      <div className="grid gap-3 text-left mt-8">
                        <div className="p-4 rounded-lg bg-card/50 border border-border">
                          <p className="font-semibold text-sm mb-1">
                            🎯 Corrective RAG
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Quality assessment and web-augmented retrieval
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-card/50 border border-border">
                          <p className="font-semibold text-sm mb-1">
                            🔀 LLM-Blender
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Combines multiple models for optimal results
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-card/50 border border-border">
                          <p className="font-semibold text-sm mb-1">
                            🧠 Self-Discover
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Step-by-step problem decomposition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-8">
                    {activeConversation?.messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        role={message.role}
                        content={message.content}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex gap-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
                          <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="text-sm font-semibold text-foreground">
                            Gemini 3x Blend
                          </p>
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
              <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
                <ChatInput onSend={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
            <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    AI Model Technique
                  </h3>
                  <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                  />
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Current Mode:
                    </span>{" "}
                    {selectedModel.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This technique enhances AI accuracy by{" "}
                    {selectedModel === "crag"
                      ? "evaluating and correcting retrieved information with web search augmentation"
                      : selectedModel === "llm-blender"
                      ? "combining outputs from multiple AI models to produce superior results"
                      : "breaking down complex problems into manageable steps"}
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
