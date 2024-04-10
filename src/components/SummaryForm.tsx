import { useEffect, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
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
    <div className="flex w-80 flex-col gap-3 border-2 p-2">
      <h1 className="text-xl font-bold">Professional Summary</h1>
      <Textarea
        id="summary"
        placeholder="I am a full stack developer"
        onChange={(e) => setSummary(e.target.value)}
      />
    </div>
  );
};

export default SummaryForm;
