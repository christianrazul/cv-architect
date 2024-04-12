import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  skills: z.array(z.string()),
});

interface SkillsFormProps {
  onSkills: (data: z.infer<typeof schema>) => void;
}

const SkillsForm = ({ onSkills }: SkillsFormProps) => {
  // state that holds the work histories in an array
  // const [skills, setSkills] = useState([] as z.infer<typeof schema>[]);

  // const [skills, setSkills] = useState<z.infer<typeof schema>>([]);

  const [skillsCount, setSkillsCount] = useState(1);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [""],
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onSkills(values);
  };

  const addSkillFields = () => {
    setSkillsCount((previous) => previous + 1);
  };

  return (
    <div className="rounded-md border p-4 shadow-md">
      <Form {...form}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Skills</h1>
          <Button
            type="button"
            variant={"link"}
            className="h-auto py-0"
            onClick={addSkillFields}
          >
            Add..
          </Button>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-2 py-2"
        >
          {Array.from({ length: skillsCount }, (_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`skills.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="TypeScript.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" variant="outline" className="self-end">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SkillsForm;
