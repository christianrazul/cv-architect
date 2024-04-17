import { SummaryData } from "./SummaryForm";
import FieldTitle from "./ui/FieldTitle";

export interface SummaryInfo {
  summary: SummaryData;
}
const Summary = ({ summary }: SummaryInfo) => {
  return (
    <div className="w-full">
      <FieldTitle color="bg-orange-600" title="PROFESSIONAL SUMMARY" />
      <div className="px-4 pb-2 pt-4">
        <p className="text-sm">{summary.summary}</p>
      </div>
    </div>
  );
};

export default Summary;
