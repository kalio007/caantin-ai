import { useState, useEffect } from "react";
import { Template, TemplateGroup } from "@/types/templates";

// This can be moved to an API call later
const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Lead Generation",
    description: "Qualify potential customers",
    category: "industry",
    isNew: true,
  },
  {
    id: "2",
    name: "Payment Collection",
    description: "Remind about due payments",
    category: "industry",
  },
  {
    id: "3",
    name: "Customer Verification",
    description: "Verify customer identity",
    category: "industry",
  },
  {
    id: "4",
    name: "Loan Application",
    description: "Process loan applications",
    category: "custom",
    lastEdited: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
];

export const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // This can be replaced with an actual API call
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTemplates(mockTemplates);
        setError(null);
      } catch (err) {
        setError("Failed to load templates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const groupedTemplates: TemplateGroup[] = [
    {
      title: "INDUSTRY TEMPLATES",
      templates: templates.filter((t) => t.category === "industry"),
    },
    {
      title: "YOUR TEMPLATES",
      templates: templates.filter((t) => t.category === "custom"),
    },
  ];

  return {
    isLoading,
    error,
    templates,
    groupedTemplates,
  };
};
