import { useState } from "react";
import "./style.css";
import HeaderForm, { headerDefaultValues } from "./components/HeaderForm";
import Resume from "./components/Resume";
import SummaryForm from "./components/SummaryForm";
import WorkHistoryForm from "./components/WorkHistoryForm";
import SkillsForm, { schema } from "./components/SkillsForm";
import { z } from "zod";
import EducationForm, {
  EducationDefaultValues,
  EducationFormData,
} from "./components/EducationForm";

export const defaultValues = {
  header: headerDefaultValues,
  summary:
    "I am a full stack developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, dolore temporibus nesciunt delectus assumenda recusandae!",
};

const exampleResume = {
  header: {
    fullName: "Rudolph Christian R. Razul",
    email: "razulchristian@gmail.com",
    contact: "09167482075",
    address: "Davao City",
  },
};

function App() {
  const [headerInfo, setHeaderInfo] = useState(exampleResume.header);
  const [summaryInfo, setSummaryInfo] = useState(defaultValues.summary);
  const [workHistoryInfo, setWorkHistoryInfo] = useState([] as any[]);
  const [skillsList, setSkillsList] = useState<z.infer<typeof schema>>({
    skills: [],
  });
  const [educationList, setEducationList] = useState<EducationFormData>({
    school: [EducationDefaultValues],
  });

  return (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-4">
        <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
        <EducationForm onEducation={(data) => setEducationList(data)} />
        <SummaryForm onSummary={(data) => setSummaryInfo(data)} />
        <SkillsForm onSkills={(skill) => setSkillsList(skill)} />
        <WorkHistoryForm onWorkHistory={(data) => setWorkHistoryInfo(data)} />
      </div>
      <Resume
        header={{ ...headerInfo }}
        summary={summaryInfo}
        workHistory={[...workHistoryInfo]}
        skills={{ ...skillsList }}
        education={{ ...educationList }}
      />
    </div>
  );
}

export default App;
