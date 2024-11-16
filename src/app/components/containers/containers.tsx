import RelativeDate from "@/components/ui/relative-date";
import { Code } from "@nextui-org/react";
import { ContainerInfo } from "dockerode";

interface ContainersProps {
  containers: ContainerInfo[];
}

export default function Containers({ containers }: ContainersProps) {
  function formatName(name: string) {
    if (name.startsWith("/")) name = name.slice(1);
    const str = name.split(".");

    if (str.length === 1) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between pr-8">
              <span className="font-semibold text-2xl">{str}</span>
            </div>
          </div>
        </div>
      );
    }

    const containerAndStack = str[0].split("_");
    return (
      <div className="flex flex-col">
        <span className="absolute top-4 right-2 bg-white rounded-full text-black size-6 text-center">
          {str[1]}
        </span>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between pr-8">
            <span className="font-semibold text-2xl">
              {containerAndStack[1]}
            </span>
            <span className="text-xl">{containerAndStack[0]}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h1 className="col-span-4 text-2xl font-semibold">
        Containers ({containers.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 py-4">
        {containers.map((container) => (
          <article
            key={container.Id}
            className="relative flex h-auto flex-col overflow-hidden rounded-lg p-4 shadow-xl transition duration-400 hover:shadow-2xl hover:bg-[#1c1c1c] border border-slate-100/10 gap-4"
          >
            {formatName(container.Names[0])}
            <div className="flex flex-col gap-1">
              <Code size="sm">{container.Id.slice(0, 12)}</Code>
              <Code size="sm">{container.Image.split("@")[0]}</Code>
            </div>
            <div className="flex flex-row justify-between">
              <span>{container.Status}</span>
              <span>{container.State}</span>
            </div>
            <RelativeDate timestamp={container.Created} />
          </article>
        ))}
      </div>
    </section>
  );
}
