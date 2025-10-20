import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModelType = "crag" | "llm-blender" | "self-discover";

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

const models = [
  {
    id: "crag" as ModelType,
    name: "CRAG",
    description: "Corrective Retrieval Augmented Generation",
  },
  {
    id: "llm-blender" as ModelType,
    name: "LLM-Blender",
    description: "Multiple model combination for enhanced output",
  },
  {
    id: "self-discover" as ModelType,
    name: "Self-Discover",
    description: "Self-composed reasoning structures",
  },
];

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="grid gap-3">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onModelChange(model.id)}
          className={cn(
            "relative p-4 rounded-lg border text-left transition-all duration-300",
            "hover:border-primary/50 hover:bg-secondary/30",
            selectedModel === model.id
              ? "border-primary bg-primary/10"
              : "border-border bg-card/50"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-sm text-foreground">{model.name}</p>
              <p className="text-xs text-muted-foreground">{model.description}</p>
            </div>
            {selectedModel === model.id && (
              <Check className="h-5 w-5 text-primary shrink-0" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
