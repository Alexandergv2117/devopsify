import { Service } from "dockerode";
import docker from "./docker";

export interface Stack {
  name: string;
  services: Service[];
}

export default async function listStacks(): Promise<Stack[] | undefined> {
  const stacks: Stack[] = [];

  try {
    const services = await docker.listServices();

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
