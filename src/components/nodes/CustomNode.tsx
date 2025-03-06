import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { X } from "lucide-react";
import { CustomNodeData } from "@/types/types";


// Create a type for our custom node props
type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: CustomNodeData;
};

const CustomNode = memo(({ id, data, type }: CustomNodeProps) => {
  const { label, options, onDelete } = data;

  // Handle the delete button click
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="">
      {/* Delete button */}
      <button
        onClick={handleDeleteClick}
        className="absolute top-0 right-0 p-1 bg-red-100 text-red-600 rounded-bl rounded-tr hover:bg-red-200 node-delete-button"
        aria-label="Delete node"
      >
        <X size={16} />
      </button>

      {/* Node type indicator */}
      <div className="flex items-center">
        <div
          className={`
          w-3 h-3 mr-2 rounded-full
          ${
            type === "greeting"
              ? "bg-green-500"
              : type === "question"
              ? "bg-blue-500"
              : type === "information"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }
        `}
        />
        <div className="font-bold">{String(type)}</div>
      </div>

      {/* Node content */}
      <div className="mt-2">{label}</div>

      {/* Options for question nodes */}
      {options && (
        <div className="mt-2">
          <div className="text-xs text-gray-500">Options:</div>
          <ul className="text-xs pl-3">
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Handles for connections */}
      {(type === "greeting" || type === "question") && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{ background: "#555", width: 8, height: 8 }}
        />
      )}

      {(type === "question" || type === "information") && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          style={{ background: "#555", width: 8, height: 8 }}
        />
      )}
    </div>
  );
});

export default CustomNode;
