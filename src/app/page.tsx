export const dynamic = 'force-dynamic';

import { listContainers, listStacks } from "@/docker";
import Containers from "./components/containers/containers";
import Stacks from "./components/stacks/stacks";

export default async function Home() {
  const containers = await listContainers();
  const stacks = await listStacks();
  return (
    <div className="flex flex-col gap-10 mt-2 w-full">
      <Stacks stacks={stacks || []} />
      <Containers containers={containers} />
    </div>
  );
}
