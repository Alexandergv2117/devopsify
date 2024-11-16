import { ContainerInfo } from "dockerode";
import docker from "./docker";

export default async function listContainers(): Promise<ContainerInfo[]> {
  try {
    const containers = await docker.listContainers();
    return containers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
