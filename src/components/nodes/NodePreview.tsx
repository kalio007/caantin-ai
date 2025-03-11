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
  const renderContent = () => {
    switch (type) {
      case "greeting":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message Text</Label>
              <Textarea
                id="message"
                value={data.message || ""}
                onChange={(e) => onUpdate({ message: e.target.value })}
                placeholder="Enter your greeting message..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case "question":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question Text</Label>
              <Textarea
                id="question"
                value={data.question || ""}
                onChange={(e) => onUpdate({ question: e.target.value })}
                placeholder="Enter your question..."
                className="min-h-[100px]"
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
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {type.charAt(0).toUpperCase() + type.slice(1)} Properties
        </CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
