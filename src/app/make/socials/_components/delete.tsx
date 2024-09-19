"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Social } from "@/types/prisma";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Delete({ data }: { data: Social }) {
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit() {
    try {
      const res = await fetch(`/api/socials/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        // For successful deletion (including 204 No Content)
        toast.success("social has been deleted successfully.");
        router.refresh();
      } else {
        // For error responses from the server
        const errorData = await res.text();
        console.error("Server error:", errorData);
        toast.error("Failed to delete social. Please try again.");
      }
    } catch (error) {
      // For network errors or other exceptions
      console.error("An error occurred:", error);
      toast.error("Failed to delete social. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Delete social</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure to delete this social media?
        </DialogDescription>

        <DialogClose asChild>
          <Button onClick={onSubmit} variant="destructive">Submit</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
