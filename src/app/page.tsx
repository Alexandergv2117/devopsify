import { docker } from "@/lib/docker";
import { Button } from "@nextui-org/react";

export default async function Home() {
  const containers = await docker.listContainers();
  return (
    <div className="flex flex-col gap-10 mt-2 w-full">
      <section className="flex flex-row justify-between items-center my-6">
        <h1 className="text-4xl font-semibold">All Projects</h1>
        <Button color="success" variant="ghost">
          Create Project
        </Button>
      </section>
      <section className="grid grid-cols-4 gap-6">
        <h1 className="col-span-4 text-2xl font-semibold">
          Containers ({containers.length})
        </h1>
        <div>
          {containers.map((container) => (
            <article
              key={container.Id}
              className="flex flex-col rounded-lg border border-white/80 p-6 gap-5"
            >
              <h1>{container.Names.splice(0, 1)[0].replace("/", "")}</h1>
              <span>{container.Status}</span>
              <span>
                {new Date(container.Created * 1000).toLocaleString("en-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
