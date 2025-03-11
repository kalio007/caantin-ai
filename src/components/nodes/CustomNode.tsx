import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { X } from "lucide-react";

interface CustomNodeData {
  label: string;
  options?: string[];
  onDelete: () => void;
}

type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: CustomNodeData;
};

export const CustomNode = memo(({ id, data, type }: CustomNodeProps) => {
  const { label, options, onDelete } = data;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const getNodeColor = () => {
    switch (type) {
      case "greeting":
        return "bg-green-500";
      case "question":
        return "bg-blue-500";
      case "knowledge":
        return "bg-yellow-500";
      case "external":
        return "bg-purple-500";
      case "transfer":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-w-[120px] md:min-w-[150px] min-h-[50px] max-w-[250px] md:max-w-[300px] bg-white rounded-lg shadow-md border border-gray-200 p-3">
      <button
        onClick={handleDeleteClick}
        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
        aria-label="Delete node"
      >
        <X size={12} />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${getNodeColor()}`} />
        <div className="text-xs font-medium text-gray-600">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </div>

      <div className="text-sm font-medium text-gray-800">{label}</div>

      {options && options.length > 0 && (
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Options:</div>
          <ul className="text-xs text-gray-600 space-y-1">
            {options.map((option, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(type === "greeting" || type === "question") && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-gray-400 border-2 border-white"
        />
      )}

      {(type === "question" ||
        type === "knowledge" ||
        type === "external" ||
        type === "transfer") && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-gray-400 border-2 border-white"
        />
      )}
    </div>
  );
});
