import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, FilePen } from "lucide-react";

const SummarySchema = z.object({
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }),
});

export type SummaryData = z.infer<typeof SummarySchema>;

export const SummaryDefaultValues = {
  summary: "",
};
interface SummaryFormProps {
  onSummary: (summaryInfo: SummaryData) => void;
}

const SummaryForm = ({ onSummary }: SummaryFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <FormField
                control={control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
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
              Submit
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SummaryForm;
