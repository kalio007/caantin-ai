import React from "react";
import { Folder } from "lucide-react";
import { Template } from "@/types/templates";
import { formatDistanceToNow } from "date-fns";

interface TemplateCardProps {
  template: Template;
  onClick?: (template: Template) => void;
}

export const TemplateCard = ({ template, onClick }: TemplateCardProps) => {
  const handleClick = () => {
    onClick?.(template);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white group"
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 ${
            template.category === "industry"
              ? "text-blue-500"
              : "text-green-500"
          }`}
        >
          <Folder className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {template.name}
            </h3>
            {template.isNew && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{template.description}</p>
          {template.lastEdited && (
            <p className="text-xs text-gray-400 mt-2">
              Last edited: {formatDistanceToNow(template.lastEdited)} ago
            </p>
          )}
        </div>
      </div>
    </button>
  );
};
