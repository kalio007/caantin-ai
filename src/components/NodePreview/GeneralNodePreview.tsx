// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { GeneralNodePreviewProps } from "@/types/types";

// const GeneralNodePreview = ({
//   editedNode,
//   handleInputChange,
// }: GeneralNodePreviewProps) => {
//   return (
//     <Card className="mb-4">
//       <CardHeader>
//         <CardTitle>{editedNode.type} Node</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-2">
//           <Label htmlFor="message-text">Message</Label>
//           <Textarea
//             id="message-text"
//             value={editedNode.data?.message || ""}
//             onChange={(e) => handleInputChange("message", e.target.value)}
//             rows={3}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default GeneralNodePreview;