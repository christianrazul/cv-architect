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
      <div className="flex w-full flex-col">
        {workHistory.map((work, index) => (
          <div key={index} className="flex w-full flex-col">
            <h2>{work.company}</h2>
            <p>{work.address}</p>
            <p>
              {work.startDate.getDate()} {work.endDate.getDate()}
            </p>
            <p>{work.role}</p>
            <p>{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
