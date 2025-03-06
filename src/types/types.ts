import { Node } from "@xyflow/react";

export interface BaseNodeData {
  id: string;
  type: "greeting" | "question" | "information";
}

export interface GreetingNodeData extends BaseNodeData {
  type: "greeting";
  data: {
    message: string;
  };
}

export interface QuestionNodeData extends BaseNodeData {
  type: "question";
  data: {
    question: string;
    options: string[];
  };
}

export interface InformationNodeData extends BaseNodeData {
  type: "information";
  data: {
    message: string;
  };
}
export type NodeData =
  | GreetingNodeData
  | QuestionNodeData
  | InformationNodeData;
export type NodePreviewDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  node: Node | null;
  onSave: (updatedNode: Node) => void;
};

export type NodeType = {
  id: string;
  type: string;
  data: {
    question?: string;
    message?: string;
    options?: string[];
  };
  originalData?: Record<string, any>;
};

export interface QuestionNodePreviewProps {
  editedNode: any;
  handleInputChange: (field: string, value: string) => void;
  handleAddOption: () => void;
  handleRemoveOption: (index: number) => void;
}
