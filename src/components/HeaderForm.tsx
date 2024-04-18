import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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
import { ChevronDown, ChevronUp, User } from "lucide-react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const HeaderSchema = z.object({
  fullName: z.string().min(1, "Name cannot be empty"),
  email: z.string().email(),
  contact: z.string(),
  address: z.string(),
  profilePicture: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
});

export type HeaderData = z.infer<typeof HeaderSchema>;

export const headerDefaultValues = {
  fullName: "",
  email: "",
  contact: "",
  address: "",
  profilePicture: "",
};
interface HeaderFormProps {
  onHeaderInfo: (headerInfo: HeaderData) => void;
}

const HeaderForm = ({ onHeaderInfo }: HeaderFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<HeaderData>({
    resolver: zodResolver(HeaderSchema),
    defaultValues: headerDefaultValues,
  });

  const { handleSubmit, control, register } = form;
  // const imageRef = form.register("profilePicture");

  return (
    <Collapsible
      className="rounded-md border bg-white p-4 shadow-md"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User
            strokeWidth={2}
            className="h-6 w-6"
            absoluteStrokeWidth={false}
          />
          <h1
            style={{ strokeWidth: 4 }}
            className="text-xl font-semibold md:inline "
          >
            Personal Information
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
            onSubmit={handleSubmit(async (data) => {
              if (data.profilePicture[0]) {
                // transform FileList Object into a dataURL so that it can be used in img
                const file = new FileReader();

                file.onload = () => {
                  onHeaderInfo({ ...data, profilePicture: file.result });
                };

                file.readAsDataURL(data.profilePicture[0]);
              } else {
                onHeaderInfo({ ...data });
              }
            })}
            className="space-y-2 "
          >
            <div className="flex flex-col gap-2 py-4">
              <FormField
                control={control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...register("profilePicture")}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
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

export default HeaderForm;
