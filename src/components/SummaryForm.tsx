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
import { ChevronDown, ChevronUp } from "lucide-react";

const SummarySchema = z.object({
  summary: z.string().min(10, { message: "Write at least 10 words" }),
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
        <h1 className="text-xl font-bold">Professional Summary</h1>
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
          <form onSubmit={handleSubmit((data) => onSummary(data))}>
            <div className="flex flex-col gap-2 py-4">
              <FormField
                control={control}
                name="summary"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Textarea id="summary" placeholder="I am a..." />
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
