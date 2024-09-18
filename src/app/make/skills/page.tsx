import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skill } from "@/types/prisma";
import Create from "./_components/create";
import Delete from "./_components/delete";
import Update from "./_components/update";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const response = await fetch(`${URL}/api/skills`, { cache: "no-store" });
  const dynamicData = await response.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Skills Management
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">
            Add New Skill
          </h2>
          <Create />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicData.map((skill: Skill) => (
            <Card
              key={skill.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-700">
                  {skill.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add any additional skill details here if available */}
                <p className="text-slate-600">{skill.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Update data={skill} />
                <Delete data={skill} />
              </CardFooter>
            </Card>
          ))}
        </div>

        {dynamicData.length === 0 && (
          <p className="text-center text-slate-600 mt-8">
            No skills found. Add your first skill above!
          </p>
        )}
      </div>
    </div>
  );
}
