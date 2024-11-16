export const dynamic = 'force-dynamic';

import { listContainers, listStacks } from "@/docker";
import Containers from "./components/containers/containers";
import Stacks from "./components/stacks/stacks";

interface HomeProps {
  searchParams: {
    containers?: string;
    containersstatus?: string;
    stacks?: string;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const stacks = await listStacks({
    filters: {
      search: searchParams.stacks,
    },
  });
  const containers = await listContainers({
    filters: {
      search: searchParams.containers,
      status: [searchParams.containersstatus || "running"],
    },
  });

  return (
    <div className="flex flex-col gap-10 mt-2 w-full">
      <Stacks stacks={stacks || []} />
      <Containers containers={containers} />
    </div>
  );
}
