//src/components/scripts/NodesSidebar.tsx
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
import { CreateNode } from "../nodes/CreateNode";
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

interface NodesSidebarProps {
  onNodeAdd?: (nodeType: string) => void;
}

export const NodesSidebar = () => {
  const { groupedTemplates, isLoading } = useTemplates();
  const [activeTab, setActiveTab] = useState("nodes");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredNodes = CONVERSATION_NODES.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { createNodes, setCreateNodes } = useSidebarContext();
  const [nodeType, setNodeType] = useState<SidebarFormType | "none">("none");

  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSave = () => {
    if (
      (nodeType === "greeting" && !message.trim()) ||
      (nodeType === "information" && !message.trim()) ||
      (nodeType === "question" && (!question.trim() || !selectedOption.trim()))
    ) {
      return;
    }

    const newNode = {
      id: `${createNodes.length + 1}`,
      type: nodeType as SidebarFormType,
      data:
        nodeType === "question"
          ? { question, options: [selectedOption] }
          : { message },
    };

    setCreateNodes([...createNodes, newNode]);
    setMessage("");
    setQuestion("");
    setSelectedOption("");
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
              className="flex-1 pb-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Nodes
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex-1 pb-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="nodes" className="flex-1 overflow-auto">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search nodes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="font-medium text-sm text-gray-500">
              CONVERSATION NODES
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-2">
                {filteredNodes.map((node) => (
                  <Button
                    key={node.id}
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto"
                    onClick={() => {
                      handleSave;
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{node.icon}</div>
                      <div className="text-left">
                        <div className="font-medium">{node.label}</div>
                        <div className="text-xs text-gray-500">
                          {node.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <div></div>
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
