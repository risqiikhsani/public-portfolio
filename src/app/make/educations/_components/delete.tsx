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
import { Education } from "@/types/prisma";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Delete({ data }: { data: Education }) {
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit() {
    try {
      const res = await fetch(`/api/educations/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        // For successful deletion (including 204 No Content)
        toast.success("Education has been deleted successfully.");
        router.refresh();
      } else {
        // For error responses from the server
        const errorData = await res.text();
        console.error("Server error:", errorData);
        toast.error("Failed to delete Education. Please try again.");
      }
    } catch (error) {
      // For network errors or other exceptions
      console.error("An error occurred:", error);
      toast.error("Failed to delete Education. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Delete Education</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure to delete this Education?
        </DialogDescription>

        <DialogClose asChild>
          <Button onClick={onSubmit} variant="destructive">Submit</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
