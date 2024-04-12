import { z } from "zod";
import { schema } from "./SkillsForm";

interface SkillsProps {
  skills: z.infer<typeof schema>;
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <div className="w-full">
      <h1 className=" bg-yellow-400 py-1 pl-4 text-xl font-bold">SKILLS</h1>
      <div className="grid w-full grid-cols-2 p-4">
        <ul>
          {/* Check array length and if it's empty, render no skills listed */}
          {skills.skills.length !== 0 ? (
            skills.skills.map((skill, index) => <li key={index}>• {skill}</li>)
          ) : (
            <li>No skills listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
