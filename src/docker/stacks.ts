import { Service } from "dockerode";
import docker from "./docker";

export interface Stack {
  name: string;
  services: Service[];
}

interface ListStacksOptions {
  filters?: {
    search?: string;
  };
}

export default async function listStacks({
  filters,
}: ListStacksOptions): Promise<Stack[] | undefined> {
  const stacks: Stack[] = [];

  try {
    const services = await docker.listServices({
      filters: {
        name: [filters?.search || ""],
      },
    });

    services.forEach((service) => {
      const stack = service.Spec?.Labels?.["com.docker.stack.namespace"];
      const stackIndex = stacks.findIndex((s) => s.name === stack);

      if (stackIndex === -1) {
        stacks.push({
          name: stack || "unknown",
          services: [service],
        });
      } else {
        stacks[stackIndex].services.push(service);
      }
    });
    return stacks;
  } catch (error) {
    console.error(error);
    return stacks;
  }
}
