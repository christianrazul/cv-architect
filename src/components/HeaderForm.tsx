import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
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
import { GradientPicker } from "./GradientPicker";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// To not allow empty files
// .refine((files) => files?.length >= 1, { message: "Image is required." })
// // To not allow files other than images
// .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
//   message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
// })
// // To not allow files larger than 5MB
// .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
//   message: `Max file size is 5MB.`,
// }),

// Custom URL validation function
const customUrl = z.string().refine(
  (val) => {
    try {
      new URL(val.includes("://") ? val : `https://${val}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  {
    message: "Invalid URL",
  },
);

const HeaderSchema = z.object({
  header: z.object({
    fullName: z.string().min(1, "Name cannot be empty"),
    email: z.string().email(),
    contact: z.string(),
    address: z.string(),
    linkedin: customUrl.optional().or(z.literal("")),
    website: customUrl.optional().or(z.literal("")),
    profilePicture: z.any().optional(),
  }),
  colors: z.object({
    email: z.string(),
    contact: z.string(),
    address: z.string(),
    linkedin: z.string(),
    website: z.string(),
  }),
});

export type HeaderData = z.infer<typeof HeaderSchema>;

export const headerDefaultValues = {
  header: {
    fullName: "",
    email: "",
    contact: "",
    address: "",
    linkedin: "",
    website: "",
    profilePicture: "",
  },
  colors: {
    email: "",
    contact: "",
    address: "",
    linkedin: "",
    website: "",
  },
};
interface HeaderFormProps {
  onHeaderInfo: (headerInfo: HeaderData) => void;
}

const HeaderForm = ({ onHeaderInfo }: HeaderFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundEmail, setBackgroundEmail] = useState(
    headerDefaultValues.colors.email,
  );
  const [backgroundContact, setBackgroundContact] = useState(
    headerDefaultValues.colors.contact,
  );
  const [backgroundAddress, setBackgroundAddress] = useState(
    headerDefaultValues.colors.address,
  );
  const [backgroundLinkedin, setBackgroundLinkedin] = useState(
    headerDefaultValues.colors.linkedin,
  );
  const [backgroundWebsite, setBackgroundWebsite] = useState(
    headerDefaultValues.colors.website,
  );

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
              if (data.header.profilePicture[0]) {
                // transform FileList Object into a dataURL so that it can be used in img
                const file = new FileReader();

                file.onload = () => {
                  onHeaderInfo({
                    ...data,
                    header: { ...data.header, profilePicture: file.result },
                  });
                };

                file.readAsDataURL(data.header.profilePicture[0]);
              } else {
                onHeaderInfo({ ...data });
              }
            })}
            className="space-y-2 "
          >
            <div className="flex flex-col gap-2 py-4">
              <FormField
                control={control}
                name="header.profilePicture"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...register("header.profilePicture")}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="header.fullName"
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
                name="header.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      Email
                      <FormItem>
                        <FormControl>
                          <Controller
                            name="colors.email"
                            control={control}
                            render={({ field }) => (
                              <GradientPicker
                                variant="sm"
                                background={backgroundEmail}
                                setBackground={(value) => {
                                  setBackgroundEmail(value);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="header.contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      Contact Number
                      <FormItem>
                        <FormControl>
                          <Controller
                            name="colors.contact"
                            control={control}
                            render={({ field }) => (
                              <GradientPicker
                                variant="sm"
                                background={backgroundContact}
                                setBackground={(value) => {
                                  setBackgroundContact(value);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormLabel>
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
                name="header.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      Address
                      <FormItem>
                        <FormControl>
                          <Controller
                            name="colors.address"
                            control={control}
                            render={({ field }) => (
                              <GradientPicker
                                variant="sm"
                                background={backgroundAddress}
                                setBackground={(value) => {
                                  setBackgroundAddress(value);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="header.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      LinkedIn
                      <FormItem>
                        <FormControl>
                          <Controller
                            name="colors.linkedin"
                            control={control}
                            render={({ field }) => (
                              <GradientPicker
                                variant="sm"
                                background={backgroundLinkedin}
                                setBackground={(value) => {
                                  setBackgroundLinkedin(value);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your LinkedIn profile URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="header.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      Website
                      <FormItem>
                        <FormControl>
                          <Controller
                            name="colors.website"
                            control={control}
                            render={({ field }) => (
                              <GradientPicker
                                variant="sm"
                                background={backgroundWebsite}
                                setBackground={(value) => {
                                  setBackgroundWebsite(value);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link your website if you have one!"
                        {...field}
                      />
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
