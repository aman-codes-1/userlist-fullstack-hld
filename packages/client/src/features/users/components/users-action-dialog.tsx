"use client";

import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { InterestItem, User } from "../data/schema";
import { MultiSelect } from "@/components/multi-select";
import { ALL_INTERESTS } from "../data/users";
import { createUser } from "@/lib/api";
import { useUsers } from "../context/users-context";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required." })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
      message:
        "Name must only contain letters with a single space between words.",
    })
    .max(70, { message: "Name is too long" }),
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Email is invalid." }),
  mobile: z
    .string()
    .nonempty({ message: "Phone number is required." })
    .refine(
      (val) => validator.isMobilePhone(val, "any", { strictMode: true }),
      {
        message: "Phone number is invalid.",
      }
    ),
  age: z
    .number({ required_error: "Age is required." })
    .min(1, "Invalid Age")
    .max(150, "Age cannot be greater than 150."),
  interests: z
    .array(
      z
        .string({ required_error: "Interests are required." })
        .min(1, "At least provide one interest.")
    )
    .min(1, { message: "Interests are required." }),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { refetchUsers } = useUsers();
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: "",
          email: "",
          mobile: "",
          age: undefined,
          interests: [],
          isEdit,
        },
  });

  const handleCreateUser = async (values: UserForm) => {
    try {
      await createUser(values);
      await refetchUsers();
      form.reset();
      onOpenChange(false);
    } catch (err: any) {
      console.error("Create user error:", err);
      toast.error(err.message);
    }
  };

  const handleUpdateUser = async (values: UserForm) => {
    form.reset();
    showSubmittedData(values);
    onOpenChange(false);
  }

  const interestOptions = ALL_INTERESTS.map((interest) => ({
    label: interest.charAt(0).toUpperCase() + interest.slice(1),
    value: interest,
  }));

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(isEdit ? handleUpdateUser : handleCreateUser)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="21"
                        className="col-span-4"
                        {...field}
                        onKeyDown={(event) => {
                          const { key, currentTarget } = event;
                          const value = currentTarget.value;
                          const allowedKeys = [
                            "Backspace",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ];
                          if (allowedKeys.includes(key)) return;
                          const isNumberKey = /^[1-9]$/.test(key);
                          const isValidContinuation = /^[0-9]$/.test(key);
                          if (value.length === 0 && !isNumberKey) {
                            event.preventDefault();
                          } else if (value.length > 0 && !isValidContinuation) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Interests
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        className="col-span-4"
                        placeholder="Select interests"
                        options={interestOptions}
                        defaultValue={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
