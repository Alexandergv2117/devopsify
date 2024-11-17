import Search from "@/components/search/search";
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
      <Search queryName={"stacks"} className="mt-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full gap-4 py-4">
        {stacks?.map((stack) => (
          <article
            key={stack.name}
            className="relative flex h-auto flex-col overflow-hidden rounded-lg p-4 shadow-xl transition duration-400 hover:shadow-2xl hover:bg-[#1c1c1c] border border-slate-100/20 gap-4"
          >
            <h1 className="font-semibold text-xl text-wrap">{stack.name}</h1>
            <span>{stack.services.length} services</span>
          </article>
        ))}
      </div>
    </section>
  );
}
