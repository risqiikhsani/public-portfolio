"use client";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  platform: z.string().min(2).max(50),
  url: z.string().min(2).max(200),
});

export default function Create() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      url: "https://",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await fetch("/api/socials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      toast.success("Skill has been created successfully.");
      form.reset()
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Failed to create Skill. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new skill</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create new skill</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="facebook">
                        facebook
                      </SelectItem>
                      <SelectItem value="instagram">
                        instagram
                      </SelectItem>
                      <SelectItem value="email">
                        email
                      </SelectItem>
                      <SelectItem value="linkedin">
                        linkedin
                      </SelectItem>
                      <SelectItem value="tiktok">
                        tiktok
                      </SelectItem>
                      <SelectItem value="youtube">
                        youtube
                      </SelectItem>
                      <SelectItem value="twitter">
                        twitter
                      </SelectItem>
                      <SelectItem value="twitch">
                        twitch
                      </SelectItem>
                      <SelectItem value="discord channel">
                        discord channel
                      </SelectItem>
                      <SelectItem value="telegram channel">
                        telegram channel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
