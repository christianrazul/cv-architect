import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, FilePen } from "lucide-react";
import { GradientPicker } from "./GradientPicker";

const SummarySchema = z.object({
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }),
  color: z.string(),
});

export type SummaryData = z.infer<typeof SummarySchema>;

export const SummaryDefaultValues = {
  summary: "",
  color: "",
};
interface SummaryFormProps {
  onSummary: (summaryInfo: SummaryData) => void;
}

const SummaryForm = ({ onSummary }: SummaryFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState(SummaryDefaultValues.color);

  const form = useForm<SummaryData>({
    resolver: zodResolver(SummarySchema),
    defaultValues: SummaryDefaultValues,
  });

  const { control, handleSubmit } = form;

  return (
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilePen
            strokeWidth={2}
            className="h-6 w-6"
            absoluteStrokeWidth={false}
          />
          <h1 style={{ strokeWidth: 4 }} className="text-xl font-semibold">
            Professional Summary
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
              onSummary(data);
              console.log(data);
            })}
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
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        id="summary"
                        placeholder="I am a..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Briefly describe yourself</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant="default">
              Update
            </Button>
          </form>
        </Form>
        {/* <Popover>
          <PopoverTrigger>Color</PopoverTrigger>
          <PopoverContent>
            <SketchPicker color={SummaryDefaultValues.color} />
          </PopoverContent>
        </Popover> */}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SummaryForm;
