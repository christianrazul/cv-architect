import { useState } from "react";
import "./style.css";
import Header, { HeaderInfo } from "./components/Header";
import HeaderForm from "./components/HeaderForm";

export const defaultHeaderInfo = {
  name: "Christian Razul",
  email: "razulchristian@gmail.com",
  contact: "09164782075",
  address: "Davao City",
};

interface ResumeProps {
  header: HeaderInfo;
}

const Resume = ({ header }: ResumeProps) => {
  return (
    <div className=" flex h-80 w-80 flex-col gap-2 border-2 ">
      <Header
        name={header.name}
        email={header.email}
        contact={header.contact}
        address={header.address}
      />
    </div>
  );
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
