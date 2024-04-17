import { CustomData } from "./CustomForm";

interface CustomDataProps {
  customInfo: CustomData;
}

const Custom = ({ customInfo }: CustomDataProps) => {
  return (
    <div className="w-full">
      <h1 className=" bg-blue-400 py-1 pl-4 text-xl font-bold">
        {customInfo.title}
      </h1>
      <div className="px-4 pb-2 pt-4">
        <p>{customInfo.description}</p>
      </div>
    </div>
  );
};

export default Custom;
