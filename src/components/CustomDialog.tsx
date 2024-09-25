"use client"
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";


function CustomDialog({dialogName, buttonName, isClose, children}: {
    dialogName: string,
    buttonName: string,
    isClose: boolean,
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Dialog open={isClose ? false : open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        {buttonName}
                    </Button>
                </DialogTrigger>
                <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen bg-white"}>
                    <DialogHeader>
                        <DialogTitle>{dialogName}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CustomDialog;