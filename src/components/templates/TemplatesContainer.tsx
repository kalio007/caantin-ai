import React from "react";
import { Template, TemplateGroup } from "@/types/templates";
import { TemplateCard } from "./TemplateCard";

interface TemplatesContainerProps {
  groups: TemplateGroup[];
  onTemplateSelect?: (template: Template) => void;
  isLoading?: boolean;
}

export const TemplatesContainer = ({
  groups,
  onTemplateSelect,
  isLoading,
}: TemplatesContainerProps) => {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="font-medium text-sm text-gray-500 px-4">
            {group.title}
          </h2>
          <div className="space-y-3">
            {group.templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={onTemplateSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
