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
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const EducationSchema = z.object({
  school: z
    .object({
      name: z.string(),
      course: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      achievements: z.array(z.string()),
    })
    .array(),
});

export type EducationFormData = z.infer<typeof EducationSchema>;

const defaultValues = {
  name: "",
  course: "",
  startDate: new Date(),
  endDate: new Date(),
  achievements: [""],
};

interface EducationFormProps {
  onEducation: (data: EducationFormData) => void;
}

const EducationForm = ({ onEducation }: EducationFormProps) => {
  const form = useForm({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      school: [defaultValues],
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
    <div className="rounded-md border p-4 shadow-md">
      <Form {...form}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Education History</h1>
          <Button
            type="button"
            onClick={() => {
              append(defaultValues);
            }}
            variant="link"
          >
            Add..
          </Button>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="space-y-2 py-2"
        >
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                {/* School Name Field */}
                <FormField
                  name={`school.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ateneo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Course Field */}
                <FormField
                  name={`school.${index}.course`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
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
                {/* Achievements Field/s */}
              </div>
            );
          })}

          <p>{errors.school?.root?.message}</p>
          <Button type="submit" variant="outline" className="self-end">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;

// create a schema for the education form
// build out the form in useForm
// build out the dom
