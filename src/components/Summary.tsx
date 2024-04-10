export interface SummaryInfo {
  summary: string;
}
const Summary = ({ summary }: SummaryInfo) => {
  return (
    <div className="w-full">
      <h1 className=" text-l bg-orange-600 pl-4 font-semibold capitalize">
        PROFESSIONAL SUMMARY
      </h1>
      <p className="text-wrap px-4 py-2">{summary}</p>
    </div>
  );
};

export default Summary;
