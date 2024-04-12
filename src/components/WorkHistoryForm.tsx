import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const schema = z.object({
  company: z.string(),
  address: z.string(),
  role: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().array().min(1),
});

interface WorkHistoryFormProps {
  onWorkHistory: (data: z.infer<typeof schema>[]) => void;
}

const WorkHistoryForm = ({ onWorkHistory }: WorkHistoryFormProps) => {
  // state that holds the work histories in an array
  const [workHistory, setWorkHistory] = useState(
    [] as z.infer<typeof schema>[],
  );

  const [descriptionCount, setDescriptionCount] = useState(1);

  // form hook
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "Lexagle",
      address: "Singapore",
      role: "Software Developer",
      startDate: new Date("2021-01-01"),
      endDate: new Date(),
      description: Array(descriptionCount).fill(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque illum quasi maiores est quam dolorem officia suscipit voluptatem consequatur vero?",
      ),
    },
  });

  // function that handles the form submission
  const onSubmit = (values: z.infer<typeof schema>) => {
    // add the work history to the existing workHistory state
    setWorkHistory([...workHistory, values]);

    // reset the form
    form.reset();
  };

  useEffect(() => {
    // call the onWorkHistory prop with the updated workHistory state
    onWorkHistory([...workHistory]);
  }, [workHistory]);

  const addDescriptionField = () => {
    setDescriptionCount(descriptionCount + 1);
  };

  return (
    <div className="rounded-md border p-4 shadow-md">
      <h1 className="text-xl font-bold">Work History</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-2">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Davao City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Descriptions */}
          {Array.from({ length: descriptionCount }, (_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`description.${index}`}
              render={({ field }) => (
                <FormItem>
                  {index === 0 && (
                    <div className="flex items-center justify-between">
                      <FormLabel>Description</FormLabel>
                      <Button
                        type="button"
                        variant={"link"}
                        className="h-auto py-0"
                        onClick={addDescriptionField}
                      >
                        Add..
                      </Button>
                    </div>
                  )}

                  <FormControl>
                    <Input placeholder="Description" {...field} />
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
              name="startDate"
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
                    <PopoverContent className="z-10 w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
              name="endDate"
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
                    <PopoverContent className="z-10 w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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

          <Button type="submit" variant="outline" className="self-end">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WorkHistoryForm;
