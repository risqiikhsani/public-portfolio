"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .max(160, {
      message: "description must not be longer than 30 characters.",
    }),
  url: z.string().min(2).max(50)
});

export default function Update({data}:{data:Project}) {
  
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name ?? "",
      description: data.description ?? "",
      url: data.url ?? "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await fetch(`/api/projects/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log(result);
      toast.success("Experience has been created successfully.");
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Failed to create Experience. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen bg-white"}>
        <DialogHeader>
          <DialogTitle>Update experience</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Job description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job url</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Job url"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
