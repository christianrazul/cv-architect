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
      <p className="text-wrap px-4 py-2">{summary.summary}</p>
    </div>
  );
};

export default Summary;
