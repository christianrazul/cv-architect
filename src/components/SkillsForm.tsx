import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  skills: z
    .object({
      skill: z.string(),
    })
    .array(),
});

type SkillsFormData = z.infer<typeof schema>;

interface SkillsFormProps {
  onSkills: (data: SkillsFormData) => void;
}

const SkillsForm = ({ onSkills }: SkillsFormProps) => {
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [
        {
          skill: "",
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  return (
    <div className="rounded-md border p-4 shadow-md">
      <Form {...form}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Skills</h1>
          <Button
            type="button"
            onClick={() => {
              append({
                skill: "",
              });
            }}
            variant="link"
          >
            Add..
          </Button>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            onSkills(data);
          })}
          className="space-y-2 py-2"
        >
          {fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                name={`skills.${index}.skill`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-1">
                        <Input placeholder="TypeScript.." {...field} />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <p>{errors.skills?.root?.message}</p>
          <Button type="submit" variant="outline" className="self-end">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SkillsForm;
