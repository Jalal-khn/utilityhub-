import type { ToolEngineConfig } from "./types";

/**
 * Build the "Key Features" list for a tool. Uses authored content when
 * available, otherwise derives an accurate list from the tool's schema.
 */
export function getToolFeatures(config: ToolEngineConfig): string[] {
  if (config.features && config.features.length > 0) {
    return config.features;
  }

  const features: string[] = [];

  if (config.schema.inputs.length > 0) {
    const labels = config.schema.inputs.map((input) => input.label);
    features.push(
      `Processes ${labels.length === 1 ? labels[0] : labels.join(", ")} directly in your browser`
    );
  }

  if (config.schema.outputs.length > 0) {
    const labels = config.schema.outputs.map((output) => output.label.toLowerCase());
    features.push(
      `Produces ${labels.length === 1 ? labels[0] : `${labels.join(", ")}`} instantly`
    );
  }

  features.push(
    "Completely free with no usage limits",
    "No registration or account required"
  );

  return features;
}

/**
 * Build the "Benefits" list for a tool. Uses authored content when available,
 * otherwise falls back to the site-wide privacy and convenience guarantees.
 */
export function getToolBenefits(config: ToolEngineConfig): string[] {
  if (config.benefits && config.benefits.length > 0) {
    return config.benefits;
  }

  return [
    `Your data never leaves your device when using ${config.name} - everything runs locally`,
    "Get accurate results in seconds",
    "Works on desktop, tablet, and mobile",
    "No software download or installation needed",
  ];
}
