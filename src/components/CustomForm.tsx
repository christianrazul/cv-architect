import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, ChevronUp, SquarePen } from "lucide-react";
import { GradientPicker } from "./GradientPicker";

const CustomSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  color: z.string(),
});

export type CustomData = z.infer<typeof CustomSchema>;

export const customDefaultValues = {
  title: "",
  description: "",
  color: "",
};
interface HeaderFormProps {
  onCustomInfo: (customInfo: CustomData) => void;
}

const CustomForm = ({ onCustomInfo }: HeaderFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState(customDefaultValues.color);

  const form = useForm<CustomData>({
    resolver: zodResolver(CustomSchema),
    defaultValues: customDefaultValues,
  });

  const { handleSubmit, control } = form;

  return (
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquarePen
            strokeWidth={2}
            className="h-6 w-6"
            absoluteStrokeWidth={false}
          />
          <h1
            style={{ strokeWidth: 4 }}
            className="text-xl font-semibold md:inline "
          >
            Custom Information
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
            onSubmit={handleSubmit((data) => onCustomInfo(data))}
            className="space-y-2 "
          >
            <div className="flex flex-col gap-2 py-4">
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
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Something like "Fun facts"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="default" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CustomForm;
