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

export  type NodePreviewDrawerProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    node: any | null;
    onSave: (updatedNode: any) => void;
  };