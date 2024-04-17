import { SummaryData } from "./SummaryForm";

export interface SummaryInfo {
  summary: SummaryData;
}
const Summary = ({ summary }: SummaryInfo) => {
  return (
    <div className="w-full">
      <h1 className=" bg-orange-600 py-1 pl-4 text-xl font-bold">
        PROFESSIONAL SUMMARY
      </h1>
      <div className="px-4 pb-2 pt-4">
        <p>{summary.summary}</p>
      </div>
    </div>
  );
};

export default Summary;
