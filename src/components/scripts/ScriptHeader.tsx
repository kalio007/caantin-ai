import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Share2, Save } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/scripts" className="text-blue-600 hover:text-blue-700">
              Scripts
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">{scriptName}</span>
            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 text-xs">
              v{version}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
