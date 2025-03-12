import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface NodePreviewProps {
  type: string;
  data: {
    message?: string;
    question?: string;
    options?: string[];
  };
  onUpdate: (data: any) => void;
  onAddOption?: () => void;
  onRemoveOption?: (index: number) => void;
}

export const NodePreview = ({
  type,
  data,
  onUpdate,
  onAddOption,
  onRemoveOption,
}: NodePreviewProps) => {
  console.log("NodePreview received data:", data);
  const renderContent = () => {
    switch (type) {
      case "greeting":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                id="message"
                value={data.message || ""}
                onChange={(e) => onUpdate({ message: e.target.value })}
                placeholder="Enter your greeting message..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        );

      case "question":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                id="question"
                value={data.question || ""}
                onChange={(e) => onUpdate({ question: e.target.value })}
                placeholder="Enter your question..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Options</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddOption}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-2">
                {data.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        onUpdate({
                          options: data.options?.map((opt, i) =>
                            i === index ? e.target.value : opt
                          ),
                        })
                      }
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveOption?.(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border-none shadow-none p-4">
      <h2 className="font-medium text-sm text-gray-500 mb-1">Message Text</h2>
      <div>{renderContent()}</div>
    </div>
  );
};
