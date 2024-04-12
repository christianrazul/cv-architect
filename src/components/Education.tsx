import { EducationFormData } from "./EducationForm";

interface EducationProps {
  schools: EducationFormData;
}

const Education = ({ schools }: EducationProps) => {
  return (
    <div className="w-full">
      <h1 className=" bg-green-500 py-1 pl-4 text-xl font-bold">EDUCATION</h1>
    </div>
  );
};

export default Education;
