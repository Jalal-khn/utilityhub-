export interface ToolConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  icon: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  input: ToolInput[];
  output: ToolOutput;
  logic: string;
  component: string;
  cacheable: boolean;
  cacheTTL?: number;
}

export interface ToolInput {
  type: "text" | "number" | "file" | "select" | "checkbox" | "textarea";
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: ValidationRule[];
  options?: Option[];
}

export interface ToolOutput {
  type: "text" | "number" | "json" | "file" | "chart" | "table";
  format?: string;
}

export interface ValidationRule {
  type: "required" | "minLength" | "maxLength" | "pattern" | "min" | "max";
  value?: any;
  message: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface ToolResult {
  success: boolean;
  data: any;
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
