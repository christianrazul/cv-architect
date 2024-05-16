import { z } from "zod";
import { schema } from "./SkillsForm";
import FieldTitle from "./ui/FieldTitle";
interface SkillsProps {
  skills: z.infer<typeof schema>;
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <div className="w-full">
      <FieldTitle color={skills.color} title="SKILLS" />
      <div className="p-4 pb-2">
        {/* Check array length and if it's empty, render no skills listed */}
        {skills.skills.length !== 0 && skills.skills[0].skill !== "" ? (
          <ul className="ml-5 list-outside list-disc columns-2">
            {skills.skills.map((skill, index) => (
              <li key={index}>{skill.skill}</li>
            ))}
          </ul>
        ) : (
          <li className="list-none">No skills listed.</li>
        )}

        {/* {skills.skills.map((skill, index) => (
          <React.Fragment key={index}>{skill.skill}, </React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default Skills;
