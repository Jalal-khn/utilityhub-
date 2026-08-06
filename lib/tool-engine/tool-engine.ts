import type { ToolEngineConfig, ToolEngineResult, ToolEngineContext } from "./types";
import { generateMetadata } from "./metadata-generator";
import { generateJsonLd } from "./jsonld-generator";
import { generateBreadcrumb, generateBreadcrumbJsonLd } from "./breadcrumb-generator";
import { generateSitemapEntry } from "./sitemap-generator";
import { findRelatedTools, buildToolIndex, type ToolIndex } from "./related-tools-finder";

export class ToolEngine {
  private context: ToolEngineContext;
  private toolIndex: ToolIndex;

  constructor(context: ToolEngineContext, allConfigs: ToolEngineConfig[] = []) {
    this.context = context;
    this.toolIndex = buildToolIndex(allConfigs);
  }

  /**
   * Update the tool index with new configurations
   */
  updateToolIndex(configs: ToolEngineConfig[]): void {
    this.toolIndex = buildToolIndex([...configs]);
  }

  /**
   * Generate all tool engine outputs for a single tool configuration
   */
  generate(
    config: ToolEngineConfig,
    options?: { categoryLabel?: string }
  ): ToolEngineResult {
    const metadata = generateMetadata(config, this.context);
    const jsonLd = generateJsonLd(config, this.context);
    const breadcrumb = generateBreadcrumb(config, options);
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(config, this.context, options);
    const relatedTools = findRelatedTools(config, this.toolIndex);
    const sitemapEntry = generateSitemapEntry(config, this.context);

    // Combine base JSON-LD with breadcrumb JSON-LD
    const combinedJsonLd = this.combineJsonLd(jsonLd, breadcrumbJsonLd);

    return {
      metadata,
      jsonLd: combinedJsonLd,
      breadcrumb,
      relatedTools,
      sitemapEntry,
    };
  }

  /**
   * Generate outputs for multiple tool configurations
   */
  generateBatch(configs: ToolEngineConfig[]): Map<string, ToolEngineResult> {
    const results = new Map<string, ToolEngineResult>();

    configs.forEach((config) => {
      results.set(config.slug, this.generate(config));
    });

    return results;
  }

  /**
   * Get related tools for a specific configuration
   */
  getRelatedTools(config: ToolEngineConfig, limit?: number): string[] {
    return findRelatedTools(config, this.toolIndex, limit);
  }

  /**
   * Generate sitemap entries for all tools
   */
  generateSitemapEntries(configs: ToolEngineConfig[]): Array<{
    url: string;
    lastModified?: string;
    changeFrequency?: string;
    priority?: number;
  }> {
    return configs.map((config) => generateSitemapEntry(config, this.context));
  }

  /**
   * Combine multiple JSON-LD schemas
   */
  private combineJsonLd(...schemas: string[]): string {
    const parsedSchemas = schemas
      .map((schema) => {
        try {
          return JSON.parse(schema);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (parsedSchemas.length === 0) {
      return "[]";
    }

    if (parsedSchemas.length === 1) {
      return JSON.stringify(parsedSchemas[0], null, 2);
    }

    // If schemas are already arrays, merge them
    if (Array.isArray(parsedSchemas[0])) {
      const merged = parsedSchemas.reduce((acc, schema) => {
        if (Array.isArray(schema)) {
          return [...acc, ...schema];
        }
        return [...acc, schema];
      }, [] as any[]);
      return JSON.stringify(merged, null, 2);
    }

    // Wrap in array if not already
    return JSON.stringify(parsedSchemas, null, 2);
  }

  /**
   * Validate a tool configuration
   */
  validateConfig(config: ToolEngineConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.name || config.name.trim() === "") {
      errors.push("Tool name is required");
    }

    if (!config.slug || config.slug.trim() === "") {
      errors.push("Tool slug is required");
    }

    if (!config.description || config.description.trim() === "") {
      errors.push("Tool description is required");
    }

    if (!config.category || config.category.trim() === "") {
      errors.push("Tool category is required");
    }

    if (!config.primaryKeyword || config.primaryKeyword.trim() === "") {
      errors.push("Primary keyword is required");
    }

    if (!config.schema || !Array.isArray(config.schema.inputs)) {
      errors.push("Schema inputs must be an array");
    }

    if (!config.schema || !Array.isArray(config.schema.outputs)) {
      errors.push("Schema outputs must be an array");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Create a singleton instance of the Tool Engine
 */
let toolEngineInstance: ToolEngine | null = null;

export function getToolEngine(
  context?: ToolEngineContext,
  configs?: ToolEngineConfig[]
): ToolEngine {
  if (!toolEngineInstance) {
    if (!context) {
      throw new Error("Tool Engine not initialized. Provide context on first call.");
    }
    toolEngineInstance = new ToolEngine(context, configs);
  } else if (configs && configs.length > 0) {
    toolEngineInstance.updateToolIndex(configs);
  }

  return toolEngineInstance;
}
