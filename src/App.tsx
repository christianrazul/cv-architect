import { useState } from "react";
import "./style.css";
import HeaderForm from "./components/HeaderForm";
import Resume from "./components/Resume";

export const defaultHeaderInfo = {
  name: "Christian Razul",
  email: "razulchristian@gmail.com",
  contact: "09164782075",
  address: "Davao City",
};

function App() {
  const [headerInfo, setHeaderInfo] = useState(defaultHeaderInfo);

  return (
    <div className="flex gap-4 p-4">
      <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
      <Resume header={{ ...headerInfo }} />
    </div>
  );
}

export default App;
