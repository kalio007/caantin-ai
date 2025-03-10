import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { X } from "lucide-react";
import { CustomNodeData } from "@/types/types";

type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: CustomNodeData;
};

const CustomNode = memo(({ id, data, type }: CustomNodeProps) => {
  const { label, options, onDelete } = data;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="min-w-[120px] md:min-w-[150px] min-h-[50px] max-w-[250px] md:max-w-[300px] h-auto w-auto p-2 md:p-[10px] relative">
      <button
        onClick={handleDeleteClick}
        className="absolute top-0 right-0 p-1 bg-red-100 text-red-600 hover:bg-red-200 node-delete-button"
        aria-label="Delete node"
      >
        <X size={14} className="md:w-4 md:h-4" />
      </button>

      <div className="flex items-left">
        <div
          className={`
          w-2 h-2 md:w-3 md:h-3 mr-1 md:mr-2 rounded-full
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
        <div className="text-sm md:text-base font-bold">{String(type)}</div>
      </div>

      <div className="m-1 md:m-2 text-xs md:text-sm text-left">{label}</div>

      {options && (
        <div className="mt-1 md:mt-2">
          <div className="text-[10px] md:text-xs text-gray-500">Options:</div>
          <ul className="text-[10px] md:text-xs pl-2 md:pl-3">
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}

      {(type === "greeting" || type === "question") && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{ background: "#555", width: 10, height: 8 }}
        />
      )}

      {(type === "question" || type === "information") && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          style={{ background: "#555", width: 10, height: 8 }}
        />
      )}
    </div>
  );
});

export default CustomNode;
