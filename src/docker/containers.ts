import { ContainerInfo } from "dockerode";
import docker from "./docker";

interface filterOptions {
  all?: boolean;
  filters?: {
    status?: string[];
    search?: string;
  }
}

export default async function listContainers({ filters}: filterOptions): Promise<ContainerInfo[]> {
  const all = filters?.status?.includes("all");
  try {
    const containers = await docker.listContainers({
      all,
      filters: {
        ...(filters?.status && !all  && { status: filters.status }),
        ...(filters?.search && { name: [filters.search] }),
      }
    });
    return containers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
