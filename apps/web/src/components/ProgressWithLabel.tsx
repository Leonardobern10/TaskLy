import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

type ProgressWithLabelProps = {
  label: string;
  progressValue: number;
};

export default function ProgressWithLabel({
  label,
  progressValue,
}: ProgressWithLabelProps) {
  return (
    <Field className="w-full">
      <FieldLabel htmlFor="progress-tasks" className="font-medium">
        <span className="text-sm md:text-xl">{label}</span>
        <span className="md:text-lg ml-auto">{Math.round(progressValue)}%</span>
      </FieldLabel>
      <Progress value={progressValue} id="progress-tasks" />
    </Field>
  );
}
