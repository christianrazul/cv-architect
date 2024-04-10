import { z } from "zod";
import { schema } from "./WorkHistoryForm";

interface WorkHistoryProps {
  workHistory: z.infer<typeof schema>[];
}
const WorkHistory = ({ workHistory }: WorkHistoryProps) => {
  return (
    <div className="w-full">
      <h1 className=" bg-orange-400 py-1 pl-4 text-xl font-bold">
        WORK HISTORY
      </h1>
      <div className="flex w-full flex-col p-4">
        {workHistory.map((work, index) => (
          <div key={index} className="flex w-full flex-col">
            <div className="flex justify-between">
              <h2 className="font-bold ">
                {work.company} | {work.address}
              </h2>
              <p>
                {work.startDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
                {" - "}
                {work.endDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="mb-1 font-bold text-primary">{work.role}</p>
            <p>{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
