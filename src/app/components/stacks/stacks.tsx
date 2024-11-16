import { Stack } from "@/docker/stacks";

interface StacksProps {
  stacks: Stack[];
}

export default function Stacks({ stacks }: StacksProps) {
  return (
    <section>
      <h1 className="col-span-4 text-2xl font-semibold">
        Stacks ({stacks?.length})
      </h1>
      <div className="grid grid-cols-3 w-full gap-4 py-4">
        {stacks?.map((stack) => (
          <article
            key={stack.name}
            className="flex flex-col rounded-lg border border-white/80 p-6 gap-5"
          >
            <h1>{stack.name}</h1>
            <span>{stack.services.length} services</span>
          </article>
        ))}
      </div>
    </section>
  );
}
