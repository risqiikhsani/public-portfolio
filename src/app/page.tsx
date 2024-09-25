import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h2>Welcome to Simple Portfolio Maker</h2>
            <Button variant="outline" className="m-4">
                <Link href={"/make"}>Make portfolio</Link>
            </Button>
            <h5>Total users : 100</h5>
            <h2 className="font-bold text-amber-900">Test</h2>

        </div>
    )
}