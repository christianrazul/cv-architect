import Summary from "./Summary";
import Header, { HeaderInfo } from "./Header";
import WorkHistory from "./WorkHistory";
import Skills from "./Skills";
import { z } from "zod";
import { schema } from "./SkillsForm";
import Education from "./Education";
import { EducationFormData } from "./EducationForm";

interface ResumeProps {
  header: HeaderInfo;
  summary: string;
  workHistory: any[];
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
    <div className="flex w-full rounded-sm border shadow-md">
      <div className="w-60 bg-primary p-4"></div>
      <div className=" flex w-full flex-col gap-2 px-4 ">
        <Header
          name={header.name}
          email={header.email}
          contact={header.contact}
          address={header.address}
        />
        <Summary summary={summary} />
        <Skills skills={skills} />
        <WorkHistory workHistory={[...workHistory]} />
        <Education schools={{ ...education }} />
      </div>
    </div>
  );
};

export default Resume;
