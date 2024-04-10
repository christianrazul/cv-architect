import React, { useEffect, useState } from "react";
import { HeaderInfo } from "./Header";
import { defaultValues } from "../App";
import { Input } from "../../components/ui/input";
interface HeaderFormProps {
  onHeaderInfo: (headerInfo: HeaderInfo) => void;
}

const HeaderForm = ({ onHeaderInfo }: HeaderFormProps) => {
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(
    defaultValues.header,
  );

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
      <h1 className="text-xl font-bold">Personal Details</h1>
      <Input
        type="text"
        id="name"
        onChange={updateInfo}
        placeholder="Full Name"
      />
      <Input type="text" id="email" onChange={updateInfo} placeholder="Email" />
      <Input
        type="text"
        id="contact"
        onChange={updateInfo}
        placeholder="Contact Number"
      />
      <Input
        type="text"
        id="address"
        onChange={updateInfo}
        placeholder="Address"
      />
    </div>
  );
};

export default HeaderForm;
