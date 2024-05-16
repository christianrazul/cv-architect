import { EducationFormData } from "./EducationForm";
import FieldTitle from "./ui/FieldTitle";

interface EducationProps {
  schools: EducationFormData;
}

const Education = ({ schools }: EducationProps) => {
  return (
    <div className="w-full">
      <FieldTitle color={schools.color} title="EDUCATION & ACHIEVEMENTS" />
      {schools.school[0].name !== "" ? (
        <div className="flex w-full flex-col gap-4 px-4 pb-2 pt-4">
          {schools.school.map((school, index) => (
            <div key={index} className="flex w-full flex-col">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h2 className="font-bold">{school.name}</h2>
                  <h2>| {school.location}</h2>
                </div>
                <p>
                  {school.startDate.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                  {" - "}
                  {school.endDate.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="mb-1 font-bold" style={{ color: schools.color }}>
                {school.degree}
              </p>
              <ul className="ml-5 list-outside list-disc text-sm">
                {school.achievements.map(
                  (achievement, index) =>
                    achievement && <li key={index}>{achievement}</li>,
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <li className="m-4 list-none">No education history.</li>
      )}
    </div>
  );
};

export default Education;
