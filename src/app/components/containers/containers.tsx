import { ContainerInfo } from "dockerode";

interface ContainersProps {
  containers: ContainerInfo[];
}

export default function Containers({ containers }: ContainersProps) {
  return (
    <section>
      <h1 className="col-span-4 text-2xl font-semibold">
        Containers ({containers.length})
      </h1>
      <div className="grid grid-cols-3 w-full gap-4 py-4">
        {containers.map((container) => (
          <article
            key={container.Id}
            className="flex flex-col rounded-lg border border-white/80 p-6 gap-5"
          >
            <h1>{container.Names[0].replace("/", "")}</h1>
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
  );
}
