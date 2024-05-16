import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Briefcase, CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { GradientPicker } from "./GradientPicker";

export const WorkHistorySchema = z.object({
  workInfo: z
    .object({
      company: z.string().min(1, {
        message: "Company name is required",
      }),
      address: z.string(),
      role: z.string().min(1, {
        message: "Role is required",
      }),
      startDate: z.date(),
      endDate: z.date(),
      description: z.string().array().min(1, {
        message: "At least 1 job responsibility is required",
      }),
    })
    .array(),
  color: z.string(),
});

export type WorkHistoryData = z.infer<typeof WorkHistorySchema>;

export const workHistoryDefaultValues = {
  workInfo: [
    {
      company: "",
      address: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
      description: ["", "", "", "", ""],
    },
  ],
  color: "",
};
interface WorkHistoryFormProps {
  onWorkHistory: (data: WorkHistoryData) => void;
}

const WorkHistoryForm = ({ onWorkHistory }: WorkHistoryFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(1);
  const [background, setBackground] = useState(workHistoryDefaultValues.color);

  const form = useForm<WorkHistoryData>({
    resolver: zodResolver(WorkHistorySchema),
    defaultValues: workHistoryDefaultValues,
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    name: "workInfo",
    control,
  });

  const addDescriptionField = () => {
    setDescriptionCount(descriptionCount + 1);
  };

  return (
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase
            strokeWidth={2}
            className="h-6 w-6"
            absoluteStrokeWidth={false}
          />
          <h1 style={{ strokeWidth: 4 }} className="text-xl font-semibold">
            Work History
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
              console.log(data);
              onWorkHistory(data);
            })}
            className="space-y-2 py-2"
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
                  {/* Company Name */}
                  <FormField
                    control={control}
                    name={`workInfo.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Company</FormLabel>
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
                            placeholder="Enter the company's name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name={`workInfo.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the company's location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Role */}
                  <FormField
                    control={form.control}
                    name={`workInfo.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Role/Job Title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Descriptions */}
                  {Array.from({ length: descriptionCount }, (_, arrayIndex) => (
                    <FormField
                      key={arrayIndex}
                      control={form.control}
                      name={`workInfo.${index}.description.${arrayIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          {arrayIndex === 0 && (
                            <div className="flex items-center justify-between">
                              <FormLabel>Description</FormLabel>
                              <Button
                                type="button"
                                variant={"link"}
                                className="h-auto py-0"
                                onClick={addDescriptionField}
                                disabled={descriptionCount === 5}
                              >
                                Add..
                              </Button>
                            </div>
                          )}
                          <FormControl>
                            <Input
                              placeholder="Job Responsibility"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  {/* Date pickers */}
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`workInfo.${index}.startDate`}
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
                      control={form.control}
                      name={`workInfo.${index}.endDate`}
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
                </div>
              );
            })}

            {/* CTA Buttons */}
            <div className="flex justify-between">
              {/* Submit Button */}
              <Button type="submit" variant="default" className="self-end">
                Submit
              </Button>
              {/* Add a Job Button*/}
              <Button
                type="button"
                onClick={() => {
                  append(workHistoryDefaultValues.workInfo);
                }}
                variant="secondary"
              >
                Add a job
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WorkHistoryForm;
