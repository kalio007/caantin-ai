import React, { useState } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const { addNode } = useSidebarContext();

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (optionToRemove: string) => {
    setOptions(options.filter((option) => option !== optionToRemove));
  };

  const handleSave = () => {
    const questionNode = {
      id: "3",
      type: "question" as const,
      data: {
        question: question,
        options: options,
      },
    };

    // Log the node details before adding
    console.log("Creating Question Node:", questionNode);

    // Add the node to the context
    addNode(questionNode);

    // Reset form state
    setQuestion("");
    setOptions([]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Question Node</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
          />

          <div className="flex gap-2">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add an option"
            />
            <Button variant="secondary" onClick={addOption}>
              Add Option
            </Button>
          </div>

          <div className="space-y-2">
            {options.map((option) => (
              <div key={option} className="flex justify-between items-center">
                <span>{option}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeOption(option)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleSave}
            disabled={!question.trim() || options.length === 0}
          >
            Create Question Node
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
