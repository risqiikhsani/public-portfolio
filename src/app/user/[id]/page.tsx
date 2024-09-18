import Image from "next/image";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${URL}/api/portfolios/${params.id}`, {
    cache: "no-store",
  });
  const dynamicData = await response.json();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-screen bg-neutral-300">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="font-bold text-6xl text-sky-400">
              {dynamicData.name}
            </h1>
            <h1 className="font-bold text-2xl text-sky-600">
              {dynamicData.fullname}
            </h1>
            <p className="text-xl">{dynamicData.bio}</p>
          </div>
          <div>
            <Image
              src="/avatars/cat.png"
              alt="avatar"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen bg-blue-300">
        <div className="flex">
          <div>
            <h1>{dynamicData.name}</h1>
            <p>{dynamicData.bio}</p>
          </div>
          <div>pic</div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen bg-red-200">
        <div className="flex">
          <div>
            <h1>{dynamicData.name}</h1>
            <p>{dynamicData.bio}</p>
          </div>
          <div>pic</div>
        </div>
      </div>
    </div>
  );
}
