import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { defaultValues } from "../App";

interface SummaryFormProps {
  onSummary: (summary: string) => void;
}

const SummaryForm = ({ onSummary }: SummaryFormProps) => {
  const [summary, setSummary] = useState(defaultValues.summary);

  useEffect(() => {
    onSummary(summary);
  }, [summary]);

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border p-4 shadow-md">
      <h1 className="text-xl font-bold">Professional Summary</h1>
      <Textarea
        id="summary"
        placeholder="Briefly describe yourself in a few sentences..."
        onChange={(e) => setSummary(e.target.value)}
      />
    </div>
  );
};

export default SummaryForm;
