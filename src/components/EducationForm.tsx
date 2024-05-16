import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GradientPicker } from "./GradientPicker";

const EducationSchema = z.object({
  school: z
    .object({
      name: z
        .string({
          required_error: "School name is required",
          invalid_type_error: "School name must be a string",
        })
        .min(1, "School name is required"),
      location: z.string(),
      degree: z
        .string({
          required_error: "Degree is required",
          invalid_type_error: "Degree must be a string",
        })
        .min(1, "Degree is required"),
      startDate: z.date(),
      endDate: z.date(),
      achievements: z.array(z.string()).min(1),
    })
    .array(),
  color: z.string(),
});

export type EducationFormData = z.infer<typeof EducationSchema>;

export const EducationDefaultValues = {
  school: [
    {
      name: "",
      location: "",
      degree: "",
      startDate: new Date(),
      endDate: new Date(),
      achievements: ["", "", "", "", ""],
    },
  ],
  color: "",
};
interface EducationFormProps {
  onEducation: (data: EducationFormData) => void;
}

const EducationForm = ({ onEducation }: EducationFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [achievementCount, setAchievementCount] = useState(1);
  const [background, setBackground] = useState(EducationDefaultValues.color);

  const form = useForm({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      school: EducationDefaultValues.school,
      color: EducationDefaultValues.color,
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "school",
    control,
  });

  return (
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap
            strokeWidth={2}
            className="h-6 w-6"
            absoluteStrokeWidth={false}
          />
          <h1 style={{ strokeWidth: 4 }} className="text-xl font-semibold">
            Education History
          </h1>
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
              onEducation(data);
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
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={
                    index !== 0
                      ? "flex flex-col gap-2 border-t-2 border-orange-500 py-4"
                      : "flex flex-col gap-2 py-4"
                  }
                >
                  {/* School Name Field */}
                  <FormField
                    name={`school.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>School</FormLabel>
                          <Button
                            variant="link"
                            onClick={() => remove(index)}
                            className="h-0 text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter School/University"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Location Field */}
                  <FormField
                    name={`school.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Degree Field */}
                  <FormField
                    name={`school.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Degree/Field of study"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Start Date and End Date Fields */}
                  <div className="flex gap-4">
                    <FormField
                      name={`school.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-36 pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "P")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="z-10 w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`school.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-36 pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "P")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="z-10 w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {Array.from({ length: achievementCount }, (_, arrayIndex) => (
                    <FormField
                      key={arrayIndex}
                      control={control}
                      name={`school.${index}.achievements.${arrayIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          {arrayIndex === 0 && (
                            <div className="flex items-center justify-between">
                              <FormLabel>Achievements</FormLabel>
                              <Button
                                type="button"
                                variant={"link"}
                                className="h-auto py-0"
                                onClick={() =>
                                  setAchievementCount((prev) => prev + 1)
                                }
                                disabled={achievementCount === 5 ? true : false}
                              >
                                Add..
                              </Button>
                            </div>
                          )}

                          <FormControl>
                            <Input placeholder="Achievement" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              );
            })}

            <p>{errors.school?.root?.message}</p>
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
                  append(EducationDefaultValues.school);
                }}
                variant="secondary"
              >
                Add a school
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EducationForm;

// create a schema for the education form
// build out the form in useForm
// build out the dom
