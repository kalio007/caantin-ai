import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GreetingNodePreviewProps {
  editedNode: any;
  handleInputChange: (field: string, value: string) => void;
}

const GreetingNodePreview = ({
  editedNode,
  handleInputChange,
}: GreetingNodePreviewProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        {/* Edit the name properly  */}
        <CardTitle> {editedNode.type} Node</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="greeting-text">Greeting</Label>
          <Textarea
            id="greeting-text"
            value={editedNode.data?.greeting || ""}
            onChange={(e) => handleInputChange("greeting", e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GreetingNodePreview;
