// import React, { useState } from "react";
// import { useSidebarContext } from "@/hooks/use-sidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { v4 as uuidv4 } from "uuid";

// export const InformationForm: React.FC = () => {
//   const [message, setMessage] = useState("");
//   const [nodes, setNodes] = useState<any[]>([]);
//   const { addNode } = useSidebarContext();

//   const handleSave = () => {
//     // Create an information node with the specified format
//     const informationNode = {
//       type: "information" as const,
//       data: {
//         message: message,
//       },
//     };

//     // Console log the node
//     console.log(informationNode);

//     // Save the node to local state
//     setNodes((prevNodes) => [...prevNodes, informationNode]);

//     // Use the addNode function from context to add the node
//     addNode(informationNode);

//     // Clear the input after saving
//     setMessage("");
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Information Node</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid w-full gap-4">
//           <Textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Enter your information message..."
//           />
//           <Button onClick={handleSave}>Create Information Node</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default InformationForm;
