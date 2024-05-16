import { CustomData } from "./CustomForm";
import FieldTitle from "./ui/FieldTitle";

interface CustomDataProps {
  customInfo: CustomData;
}

const Custom = ({ customInfo }: CustomDataProps) => {
  return (
    customInfo.title !== "" && (
      <div className="w-full">
        <FieldTitle color={customInfo.color} title={customInfo.title} />
        <div className="px-4 pb-2 pt-4">
          <p>{customInfo.description}</p>
        </div>
      </div>
    )
  );
};

export default Custom;
