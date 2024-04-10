import { useState } from "react";
import "./style.css";

const HeaderForm = () => {
  const [headerInfo, setHeaderInfo] = useState({
    name: "Chan Razul",
    email: "",
    contact: 0,
    address: "",
  });

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = { ...headerInfo, name: event.target.value };

    setHeaderInfo(updatedName);
  };

  return (
    <div>
      <input
        type="text"
        onChange={updateName}
        placeholder="Christian Razul"
        className="border-2 border-gray-500"
      />
      <p>{headerInfo.name}</p>
    </div>
  );
};

interface HeaderProps {
  name: string;
  email?: string;
  contact?: number;
  address?: string;
}

const Header = ({ name, email, contact, address }: HeaderProps) => {
  return (
    <div className="flex bg-blue-500">
      <div>{name && <h1>{name}</h1>}</div>
    </div>
  );
};

const Summary = () => {
  return <div className="">Summary</div>;
};

const Education = () => {
  return <div className="">Education</div>;
};

const WorkHistory = () => {
  return <div className="">Work History</div>;
};

const Resume = ({ name }) => {
  return (
    <div className="border-3 flex h-auto w-80 flex-col gap-2 border-red-200 p-4">
      <Header name={name} />
      {/* <Summary />
      <Education />
      <WorkHistory /> */}
    </div>
  );
};

function App() {
  return (
    <>
      <HeaderForm />
      <Resume name="Chan" />
    </>
  );
}

export default App;
