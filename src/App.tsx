import { useEffect, useState } from "react";
import "./style.css";

interface HeaderInfo {
  name: string;
  email: string;
  contact: number;
  address: string;
}

interface HeaderFormProps {
  onHeaderInfo: (headerInfo: HeaderInfo) => void;
}

const defaultHeaderInfo = {
  name: "Christian Razul",
  email: "razulchristian@gmail.com",
  contact: "09164782075",
  address: "Davao City",
};

const HeaderForm = ({ onHeaderInfo }: HeaderFormProps) => {
  const [headerInfo, setHeaderInfo] = useState(defaultHeaderInfo);

  const updateInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateInfo = {
      ...headerInfo,
      [event.target.id]: event.target.value,
    };
    setHeaderInfo(updateInfo);
  };

  // pass the headerInfo to the parent component every time there is a change
  useEffect(() => {
    onHeaderInfo({ ...headerInfo });
  }, [headerInfo]);

  return (
    <div className="flex h-80 w-80 flex-col gap-3 border-2 p-2">
      <input
        type="text"
        id="name"
        onChange={updateInfo}
        placeholder="Christian Razul"
        className="h-8 border-2 border-gray-500 p-2"
      />
      <input
        type="text"
        id="email"
        onChange={updateInfo}
        placeholder="razulchristian@gmail.com"
        className="h-8 border-2 border-gray-500 p-2"
      />
      <input
        type="text"
        id="contact"
        onChange={updateInfo}
        placeholder="00000"
        className="h-8 border-2 border-gray-500 p-2"
      />
      <input
        type="text"
        id="address"
        onChange={updateInfo}
        placeholder="Davao City"
        className="h-8 border-2 border-gray-500 p-2"
      />
    </div>
  );
};

interface HeaderProps {
  name: string;
  email: string;
  contact: string;
  address: string;
}

const Header = ({ name, email, contact, address }: HeaderProps) => {
  return (
    <div className="flex w-full border border-red-500 p-4">
      <div>
        {name && (
          <h1>
            {name} {email} {contact} {address}
          </h1>
        )}
      </div>
    </div>
  );
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
