import { useEffect, useState } from "react";
import "./style.css";
import HeaderForm from "./components/HeaderForm";
import Resume from "./components/Resume";
import SummaryForm from "./components/SummaryForm";

export const defaultValues = {
  header: {
    name: "Rudolph Christian Razul",
    email: "razulchristian@gmail.com",
    contact: "09164782075",
    address: "Davao City, Philippines",
  },
  summary:
    "I am a full stack developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, libero!",
};
function App() {
  const [headerInfo, setHeaderInfo] = useState(defaultValues.header);
  const [summaryInfo, setSummaryInfo] = useState(defaultValues.summary);
  return (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-4">
        <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
        <SummaryForm onSummary={(data) => setSummaryInfo(data)} />
      </div>
      <Resume header={{ ...headerInfo }} summary={summaryInfo} />
    </div>
  );
}

export default App;
