import { useState } from "react";
import "./style.css";
import HeaderForm from "./components/HeaderForm";
import Resume from "./components/Resume";
import SummaryForm from "./components/SummaryForm";
import WorkHistoryForm from "./components/WorkHistoryForm";
import SkillsForm from "./components/SkillsForm";

export const defaultValues = {
  header: {
    name: "Rudolph Christian Razul",
    email: "razulchristian@gmail.com",
    contact: "09164782075",
    address: "Davao City, Philippines",
  },
  summary:
    "I am a full stack developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, dolore temporibus nesciunt delectus assumenda recusandae!",
};

function App() {
  const [headerInfo, setHeaderInfo] = useState(defaultValues.header);
  const [summaryInfo, setSummaryInfo] = useState(defaultValues.summary);
  const [workHistoryInfo, setWorkHistoryInfo] = useState([] as any[]);

  return (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-4">
        <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
        <SummaryForm onSummary={(data) => setSummaryInfo(data)} />
        <SkillsForm />
        <WorkHistoryForm onWorkHistory={(data) => setWorkHistoryInfo(data)} />
      </div>
      <Resume
        header={{ ...headerInfo }}
        summary={summaryInfo}
        workHistory={[...workHistoryInfo]}
      />
    </div>
  );
}

export default App;
