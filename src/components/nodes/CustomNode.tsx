import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  X,
  MessageCircle,
  HelpCircle,
  GitFork,
  Database,
  PhoneForwarded,
} from "lucide-react";
import { CustomNodeProps, NodeType } from "@/types/nodes";

export const CustomNode = memo(({ id, data, type }: CustomNodeProps) => {
  const { label, description, options, onDelete } = data;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const getNodeIcon = () => {
    switch (type as NodeType) {
      case "greeting":
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case "question":
        return <HelpCircle className="w-5 h-5 text-blue-500" />;
      case "decision":
        return <GitFork className="w-5 h-5 text-purple-500" />;
      case "knowledge":
        return <HelpCircle className="w-5 h-5 text-yellow-500" />;
      case "external":
        return <Database className="w-5 h-5 text-purple-500" />;
      case "transfer":
        return <PhoneForwarded className="w-5 h-5 text-orange-500" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="group relative">
      <div className="min-w-[200px] bg-white rounded-lg  hover:border-gray-300 transition-colors">
        <button
          onClick={handleDeleteClick}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          aria-label="Delete node"
        >
          <X size={12} />
        </button>

        <div className="flex flex-col items-left gap-3 px-2 py-2">
          <div className="flex space-x-2 text-sm">
            <div>{getNodeIcon()}</div>
            <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900">{label}</div>
          </div>
        </div>

        {options && options.length > 0 && (
          <div className="mt-3 space-y-1">
            {options.map((option, index) => (
              <div key={index} className="text-sm text-gray-600">
                • {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {(type === "greeting" || type === "question") && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 border-2 border-white bg-blue-500"
          style={{ right: -6 }}
        />
      )}

      {(type === "question" ||
        type === "decision" ||
        type === "knowledge" ||
        type === "external" ||
        type === "transfer") && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 border-2 border-white bg-blue-500"
          style={{ left: -6 }}
        />
      )}
    </div>
  );
});

// function getDefaultDescription(type: NodeType): string {
//   switch (type) {
//     case "greeting":
//       return "Start your conversation";
//     case "question":
//       return "Ask the customer something";
//     case "decision":
//       return "Create a branch in the flow";
//     case "knowledge":
//       return "Retrieve information";
//     case "external":
//       return "Connect to your systems";
//     case "transfer":
//       return "Hand off to a human agent";
//     default:
//       return "";
//   }
// }
