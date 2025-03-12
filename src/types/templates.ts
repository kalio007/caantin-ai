export interface Template {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: "industry" | "custom";
  lastEdited?: Date;
  isNew?: boolean;
}

export interface TemplateGroup {
  title: string;
  templates: Template[];
}
