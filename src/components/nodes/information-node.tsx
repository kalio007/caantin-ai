import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

const InformationBaseNode = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <div>Base Node</div>
    </BaseNode>
  );
});

export default InformationBaseNode;
// import React from "react";
// import { NodeProps, Position, useReactFlow, Node } from "@xyflow/react";
// import { BaseNode } from "@/components/base-node";
// import { BaseHandle } from "@/components/base-handle";
// import {
//   NodeHeader,
//   NodeHeaderTitle,
//   NodeHeaderActions,
//   NodeHeaderMenuAction,
// } from "../node-header";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// // import { InformationNodeData } from "./types";

// export default function InformationNode({
//   id,
//   data,
//   selected,
// }: NodeProps<Node<InformationNodeData>>) {
//   const { deleteElements, getNodes, setNodes } = useReactFlow();

//   const handleDelete = () => {
//     deleteElements({ nodes: [{ id }] });
//   };

//   const handleUpdateMessage = (message: string) => {
//     setNodes((currentNodes) =>
//       currentNodes.map((node) =>
//         node.id === id
//           ? {
//               ...node,
//               data: {
//                 type: node.data.type,
//                 label: node.data.label,
//                 content: { message },
//               },
//             }
//           : node
//       )
//     );
//   };

//   return (
//     <BaseNode selected={selected}>
//       <NodeHeader>
//         <NodeHeaderTitle>Information</NodeHeaderTitle>
//         <NodeHeaderActions>
//           <NodeHeaderMenuAction>
//             <DropdownMenuItem onSelect={handleDelete}>
//               Delete Node
//             </DropdownMenuItem>
//           </NodeHeaderMenuAction>
//         </NodeHeaderActions>
//       </NodeHeader>

//       <div className="mt-4">
//         <textarea
//           className="w-full p-2 border rounded resize-none"
//           rows={3}
//           value={data.content?.message || ""}
//           onChange={(e) => handleUpdateMessage(e.target.value)}
//           placeholder="Enter information message"
//         />
//       </div>
//       <BaseHandle id="target-1" type="target" position={Position.Left} />
//     </BaseNode>
//   );
// }
