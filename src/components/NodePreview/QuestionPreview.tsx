import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuestionNodePreviewProps {
  editedNode: any;
  handleInputChange: (field: string, value: string) => void;
  handleAddOption: () => void;
  handleRemoveOption: (index: number) => void;
}

const QuestionNodePreview = ({
  editedNode,
  handleInputChange,
  handleAddOption,
  handleRemoveOption,
}: QuestionNodePreviewProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Question Node</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-text">Question</Label>
          <Textarea
            id="question-text"
            value={editedNode.data?.question || ""}
            onChange={(e) => handleInputChange("question", e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Options</Label>
          {editedNode.data?.options?.map((option: string, index: number) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                value={option}
                onChange={(e) =>
                  handleInputChange(`option_${index}`, e.target.value)
                }
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveOption(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddOption}
            className="mt-2"
          >
            Add Option
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionNodePreview;
