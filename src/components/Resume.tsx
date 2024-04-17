import Summary from "./Summary";
import Header from "./Header";
import WorkHistory from "./WorkHistory";
import Skills from "./Skills";
import { z } from "zod";
import { schema } from "./SkillsForm";
import Education from "./Education";
import { EducationFormData } from "./EducationForm";
import { HeaderData } from "./HeaderForm";
import { SummaryData } from "./SummaryForm";
import { WorkHistoryData } from "./WorkHistoryForm";

interface ResumeProps {
  header: HeaderData;
  summary: SummaryData;
  workHistory: WorkHistoryData;
  skills: z.infer<typeof schema>;
  education: EducationFormData;
}

const Resume = ({
  header,
  summary,
  workHistory,
  skills,
  education,
}: ResumeProps) => {
  return (
    <div className="flex w-[21cm] gap-4 rounded-md border bg-white p-8 shadow-xl">
      {/* <div className="w-60 bg-primary p-4"></div> */}
      <div className=" flex w-full flex-col gap-2 px-4 ">
        <Header header={{ ...header }} />
        <Summary summary={{ ...summary }} />
        <Skills skills={skills} />
        <WorkHistory workHistory={{ ...workHistory }} />
        <Education schools={{ ...education }} />
      </div>
    </div>
  );
};

export default Resume;
