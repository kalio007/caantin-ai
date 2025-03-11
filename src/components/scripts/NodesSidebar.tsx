import React from "react";
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
  onNodeAdd: (nodeType: string) => void;
}

export const NodesSidebar = ({ onNodeAdd }: NodesSidebarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredNodes = CONVERSATION_NODES.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-full">
      <div className="p-4">
        <Tabs defaultValue="nodes">
          <TabsList className="w-full">
            <TabsTrigger value="nodes" className="flex-1">
              Nodes
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nodes" className="mt-4">
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
                      onClick={() => onNodeAdd(node.type)}
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
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-280px)] text-gray-500">
              <Plus className="h-8 w-8 mb-2" />
              <p className="text-sm">No templates available</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
