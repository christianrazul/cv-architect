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
import { CustomData } from "./CustomForm";
import Custom from "./Custom";
import React, { ForwardedRef } from "react";

interface ResumeProps {
  header: HeaderData;
  summary: SummaryData;
  workHistory: WorkHistoryData;
  skills: z.infer<typeof schema>;
  education: EducationFormData;
  custom: CustomData;
}

const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(
  (
    { header, summary, workHistory, skills, education, custom }: ResumeProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className="shrink-0 bg-white p-8 shadow-xl md:w-[21cm]">
        <div className="flex w-full flex-col gap-2">
          <Header header={{ ...header }} />
          <Summary summary={{ ...summary }} />
          {skills && <Skills skills={skills} />}
          <WorkHistory workHistory={{ ...workHistory }} />
          <Education schools={{ ...education }} />
          {custom && <Custom customInfo={{ ...custom }} />}
        </div>
      </div>
    );
  },
);

export default Resume;
