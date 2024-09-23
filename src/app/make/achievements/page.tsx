import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/types/prisma";
import Create from "./_components/create";
import Delete from "./_components/delete";
import Update from "./_components/update";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const response = await fetch(`${URL}/api/experiences`, { cache: "no-store" });
  const dynamicData = await response.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Experiences
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">
            Add New Experience
          </h2>
          <Create />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicData.map((experience: Experience) => (
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden" key={experience.id}>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    {experience.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-sm font-medium">
                    {experience.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <p className="text-slate-600 mb-4">{experience.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    <span>{experience.place}</span>
                  </div>
                  <div className="flex items-center col-span-2">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>
                      {experience.start_time &&
                        format(
                          new Date(experience.start_time),
                          "MMM yyyy"
                        )}{" "}
                      -
                      {experience.end_time
                        ? format(new Date(experience.end_time), "MMM yyyy")
                        : "Present"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 bg-slate-50 border-t border-slate-200">
                <Update data={experience} />
                <Delete data={experience} />
              </CardFooter>
            </Card>
          ))}
        </div>

        {dynamicData.length === 0 && (
          <p className="text-center text-slate-600 mt-8">
            No experiences found. Add your first experience above!
          </p>
        )}
      </div>
    </div>
  );
}
