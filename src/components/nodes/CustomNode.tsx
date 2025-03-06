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
    <div
      className=""
      style={{
        minWidth: "100px",
        minHeight: "50px",
        maxWidth: "200px",
      }}
    >
      <button
        onClick={handleDeleteClick}
        className="absolute top-0 right-0  bg-red-100 text-red-600  hover:bg-red-200 node-delete-button"
        aria-label="Delete node"
      >
        <X size={16} />
      </button>

      <div className="flex items-left">
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

      <div className="m-2  text-left">{label}</div>

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
