import { ToolEngineConfig } from "@/lib/tool-engine";
import { Text } from "@/components/ui/typography";

interface ToolGuideProps {
  config: ToolEngineConfig;
}

export function ToolGuide({ config }: ToolGuideProps) {
  const requiredInputs = config.schema.inputs;
  const outputs = config.schema.outputs;

  return (
    <div className="space-y-4">
      <ol className="list-decimal space-y-3 pl-5">
        {requiredInputs.length > 0 && (
          <li>
            <Text variant="muted">
              Provide {requiredInputs.length === 1 ? "the required input" : "the required inputs"} (
              {requiredInputs.map((input) => input.label).join(", ")}).
            </Text>
          </li>
        )}
        {outputs.length > 0 && (
          <li>
            <Text variant="muted">
              The tool processes everything locally in your browser and instantly produces{" "}
              {outputs.length === 1 ? outputs[0].label.toLowerCase() : `the following results: ${outputs.map((output) => output.label).join(", ")}`}.
            </Text>
          </li>
        )}
        <li>
          <Text variant="muted">
            Review the result, then copy it to your clipboard or download the output file directly from this page.
          </Text>
        </li>
      </ol>
      <div className="rounded-lg bg-muted/60 p-4">
        <Text variant="muted" className="text-sm">
          Privacy note: {config.name} runs 100% in your browser. Your data is never uploaded to any server,
          so nothing is stored or shared.
        </Text>
      </div>
    </div>
  );
}
