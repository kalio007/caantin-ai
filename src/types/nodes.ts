import { NodeProps } from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  options?: string[];
  onDelete: () => void;
}

export type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: NodeData;
};

export type NodeType =
  | "greeting"
  | "question"
  | "decision"
  | "knowledge"
  | "external"
  | "transfer"
  | "default";

export interface CreateNode {
  id: string;
  type: NodeType;
  data: {
    message?: string;
    question?: string;
    options?: string[];
  };
}
