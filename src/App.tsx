import { useState } from "react";
import "./style.css";
import HeaderForm from "./components/HeaderForm";
import Resume from "./components/Resume";
import { Textarea } from "../components/ui/textarea";

export const defaultHeaderInfo = {
  name: "Christian Razul",
  email: "razulchristian@gmail.com",
  contact: "09164782075",
  address: "Davao City",
};

const SummaryForm = () => {
  return (
    <div className="flex w-80 flex-col gap-3 border-2 p-2">
      <h1 className="text-xl font-bold">Professional Summary</h1>
      <Textarea
        id="summary"
        placeholder="I am a full stack developer"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

const Summary = () => {
  return (
    <div className="w-80">
      <h1 className=" bg-orange-600 text-black">Professional Summary</h1>
    </div>
  );
};

function App() {
  const [headerInfo, setHeaderInfo] = useState(defaultHeaderInfo);

  return (
    <div className="flex gap-4 p-4">
      <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />

      <SummaryForm />
      <Resume header={{ ...headerInfo }} />
    </div>
  );
}

export default App;
