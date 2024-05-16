import { SummaryData } from "./SummaryForm";
import FieldTitle from "./ui/FieldTitle";

export interface SummaryInfo {
  summary: SummaryData;
}
const Summary = ({ summary }: SummaryInfo) => {
  return (
    summary.summary !== "" && (
      <div className="w-full">
        <FieldTitle color={`${summary.color}`} title="PROFESSIONAL SUMMARY" />
        <div className="px-4 pb-2 pt-4">
          <p className="text-md">{summary.summary}</p>
        </div>
      </div>
    )
  );
};

export default Summary;
