import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  skills: z.string().array(),
});

interface SkillsFormProps {
  onSkills?: (data: z.infer<typeof schema>) => void;
}

const SkillsForm = ({ onSkills }: SkillsFormProps) => {
  const [skillsCount, setSkillsCount] = useState(1);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: Array(skillsCount),
    },
  });

  return (
    <div className="rounded-md border p-4 shadow-md">
      <h1 className="text-xl font-bold">Skills</h1>
    </div>
  );
};

export default SkillsForm;
