import { WorkHistoryData } from "./WorkHistoryForm";
import FieldTitle from "./ui/FieldTitle";

interface WorkHistoryProps {
  workHistory: WorkHistoryData;
}
const WorkHistory = ({ workHistory }: WorkHistoryProps) => {
  return (
    <div className="w-full">
      <FieldTitle color={`${workHistory.color}`} title="WORK HISTORY" />
      <div className="flex w-full flex-col gap-4 px-4 pb-2 pt-4">
        {workHistory.workInfo[0].company !== "" ? (
          workHistory.workInfo.map((work, index) => (
            <div key={index} className="flex w-full flex-col">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h2 className="font-bold">{work.company}</h2>
                  <h2>| {work.address}</h2>
                </div>
                <p>
                  {work.startDate.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                  {" - "}
                  {work.endDate.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p
                className={`mb-1 font-bold`}
                style={{ color: workHistory.color }}
              >
                {work.role}
              </p>
              <ul className="ml-5 list-outside list-disc text-sm">
                {work.description.map((desc, index) => {
                  return desc && <li key={index}>{desc}</li>;
                })}
              </ul>
            </div>
          ))
        ) : (
          <li className="list-none">No work history.</li>
        )}
      </div>
    </div>
  );
};

export default WorkHistory;
