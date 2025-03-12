import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  HelpCircle,
  Database,
  ExternalLink,
  PhoneForwarded,
  Plus,
  Search,
} from "lucide-react";
import { TemplatesContainer } from "@/components/templates/TemplatesContainer";
import { useTemplates } from "@/hooks/use-templates";
import { Template } from "@/types/templates";
import { useSidebarContext, type SidebarFormType } from "@/hooks/use-sidebar";

interface NodeType {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const CONVERSATION_NODES: NodeType[] = [
  {
    id: "greeting",
    type: "greeting",
    icon: <MessageCircle className="h-4 w-4 text-green-500" />,
    label: "Greeting",
    description: "Start your conversation",
  },
  {
    id: "question",
    type: "question",
    icon: <HelpCircle className="h-4 w-4 text-blue-500" />,
    label: "Question",
    description: "Ask the customer something",
  },
  {
    id: "knowledge-base",
    type: "knowledge",
    icon: <Database className="h-4 w-4 text-yellow-500" />,
    label: "Knowledge Base",
    description: "Retrieve information",
  },
  {
    id: "external-data",
    type: "external",
    icon: <ExternalLink className="h-4 w-4 text-purple-500" />,
    label: "External Data",
    description: "Connect to your systems",
  },
  {
    id: "transfer",
    type: "transfer",
    icon: <PhoneForwarded className="h-4 w-4 text-orange-500" />,
    label: "Transfer",
    description: "Hand off to a human agent",
  },
];

// Default values for each node type
const DEFAULT_NODE_VALUES = {
  greeting: {
    message: "Hello! How can I help you today?",
  },
  question: {
    question: "What would you like to know?",
    options: ["More information", "Talk to an agent", "Browse products"],
  },
  knowledge: {
    knowledgeBase: "General product information",
  },
  external: {
    externalSource: "CRM system",
  },
  transfer: {
    transferTo: "Customer support",
  },
};

interface NodesSidebarProps {
  onNodeAdd?: (nodeType: string) => void;
}

export const NodesSidebar = () => {
  const { groupedTemplates, isLoading } = useTemplates();
  const [activeTab, setActiveTab] = useState("nodes");
  const [searchQuery, setSearchQuery] = useState("");
  const { createNodes, setCreateNodes } = useSidebarContext();

  const filteredNodes = CONVERSATION_NODES.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle node selection and creation
  const handleNodeSelect = (node: NodeType) => {
    // Create node data based on the selected type
    let nodeData = {};

    switch (node.type) {
      case "greeting":
        nodeData = DEFAULT_NODE_VALUES.greeting;
        break;
      case "question":
        nodeData = DEFAULT_NODE_VALUES.question;
        break;
      case "knowledge":
        nodeData = DEFAULT_NODE_VALUES.knowledge;
        break;
      case "external":
        nodeData = DEFAULT_NODE_VALUES.external;
        break;
      case "transfer":
        nodeData = DEFAULT_NODE_VALUES.transfer;
        break;
      default:
        return;
    }

    // Create the new node with pre-filled data
    const newNode = {
      id: `node-${Date.now()}`,
      type: node.type as SidebarFormType,
      data: nodeData,
    };

    // Add the new node to the list
    setCreateNodes((prevNodes) => [...prevNodes, newNode]);
    console.log("this is the newNode array",newNode);
  };
  const handleTemplateSelect = (template: Template) => {
    // Handle template selection
    console.log("Selected template:", template);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Tabs
        defaultValue="nodes"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1"
      >
        <div className="border-b border-gray-200 bg-white px-4">
          <TabsList className="flex w-full gap-8">
            <TabsTrigger
              value="nodes"
              className="flex-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Nodes
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="nodes" className="flex-1 overflow-auto">
          <div className="space-y-4">
            <div className="relative px-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search nodes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="font-medium text-sm text-gray-500 px-4">
              CONVERSATION NODES
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-2 px-2">
                {filteredNodes.map((node) => (
                  <Button
                    key={node.id}
                    className="w-full justify-start p-2 h-auto border-gray-300 bg-white  rounded-lg hover:bg-gray-200"
                    onClick={() => handleNodeSelect(node)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{node.icon}</div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 text-sm">
                          {node.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {node.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 overflow-auto">
          <TemplatesContainer
            groups={groupedTemplates}
            onTemplateSelect={handleTemplateSelect}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
