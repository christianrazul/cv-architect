import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, PencilRuler } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Label } from "./ui/label";
import { GradientPicker } from "./GradientPicker";

export const schema = z.object({
  skills: z
    .object({
      skill: z.string(),
    })
    .array(),
  color: z.string(),
});

export type SkillsFormData = z.infer<typeof schema>;

interface SkillsFormProps {
  onSkills: (data: SkillsFormData) => void;
}

const SkillsFormDefaultValues = {
  skills: [
    {
      skill: "",
    },
  ],
  color: "",
};

const SkillsForm = ({ onSkills }: SkillsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState(SkillsFormDefaultValues.color);

  const form = useForm<SkillsFormData>({
    resolver: zodResolver(schema),
    defaultValues: SkillsFormDefaultValues,
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
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <PencilRuler
              strokeWidth={2}
              className="h-6 w-6"
              absoluteStrokeWidth={false}
            />
            <h1 style={{ strokeWidth: 4 }} className="text-xl font-semibold">
              Skills
            </h1>
          </div>
          {isOpen && <Label className="font-light">Add up to 10 skills</Label>}
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit((data) => {
              onSkills(data);
            })}
            className="space-y-2"
          >
            <FormLabel>Pick a tab color</FormLabel>
            <FormItem>
              <FormControl>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <GradientPicker
                      background={background}
                      setBackground={(value) => {
                        setBackground(value);
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className="flex flex-col gap-2 py-2">
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
            </div>
            {/* CTA Buttons */}
            <div className="flex justify-between">
              {/* Submit Button */}
              <Button type="submit" variant="default" className="self-end">
                Submit
              </Button>
              {/* Add a School Button*/}
              <Button
                type="button"
                onClick={() => {
                  append({
                    skill: "",
                  });
                }}
                variant="secondary"
                disabled={fields.length === 10}
              >
                Add a skill
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SkillsForm;
