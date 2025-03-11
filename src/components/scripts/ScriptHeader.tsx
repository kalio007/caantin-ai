import React from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { PlayCircle, Share2, Save } from "lucide-react";

interface ScriptHeaderProps {
  scriptName: string;
  version: string;
  onTest?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export const ScriptHeader = ({
  scriptName,
  version,
  onTest,
  onShare,
  onSave,
}: ScriptHeaderProps) => {
  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/scripts">Scripts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-gray-600">
                {scriptName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-900">
              {scriptName}
            </h1>
            <span className="text-sm text-gray-500">v{version}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
            onClick={onTest}
          >
            <PlayCircle className="mr-1 h-4 w-4" />
            Test
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onSave}
          >
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
