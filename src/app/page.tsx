"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";

const PROJECTS = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "Active",
    environments: [
      { name: "Staging", status: "Running", lastDeployed: "1 day ago" },
      { name: "Production", status: "Running", lastDeployed: "3 days ago" },
    ],
  },
  {
    id: 2,
    name: "Blog Engine",
    status: "Inactive",
    environments: [
      { name: "Staging", status: "Stopped", lastDeployed: "1 week ago" },
      { name: "Production", status: "Running", lastDeployed: "2 weeks ago" },
    ],
  },
  {
    id: 3,
    name: "Mobile App Backend",
    status: "Active",
    environments: [
      { name: "Staging", status: "Running", lastDeployed: "2 hours ago" },
      { name: "Production", status: "Running", lastDeployed: "1 day ago" },
    ],
  },
  {
    id: 4,
    name: "Customer Portal",
    status: "Active",
    environments: [
      { name: "Staging", status: "Failed", lastDeployed: "4 hours ago" },
      { name: "Production", status: "Running", lastDeployed: "2 days ago" },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mt-2 w-full">
      <section className="flex flex-row justify-between items-center my-6">
        <h1 className="text-4xl font-semibold">All Projects</h1>
        <Button color="success" variant="ghost">
          Create Project
        </Button>
      </section>
      <section className="w-full grid grid-cols-3 gap-8">
        {PROJECTS.map((project, i) => (
          // <Link key={i} href={`/projects/${i}`}>
          <Card className="w-full h-full min-h-60 bg-white/10" key={i}>
            <CardHeader className="flex justify-between w-full">
              <Link
                href={`/projects/${project.id}`}
                className="hover:text-white/60"
              >
                <h2 className="font-semibold text-2xl">{project.name}</h2>
              </Link>
              <Chip color={project.status === "Active" ? "success" : "danger"}>
                {project.status}
              </Chip>
            </CardHeader>
            <CardBody>
              <Tabs aria-label="Environments">
                {project.environments.map((env, j) => (
                  <Tab key={j} title={env.name}>
                    <Link href={`/projects/${project.id}?env=${env.name}`}>
                      <Card className="w-full bg-white/10">
                        <CardBody className="gap-4">
                          <span className="flex justify-between items-center">
                            <p>{env.name}</p>
                            <Chip
                              color={
                                env.status === "Running" ? "success" : "danger"
                              }
                            >
                              {env.status}
                            </Chip>
                          </span>
                          <p>Last Deployed: {env.lastDeployed}</p>
                        </CardBody>
                      </Card>
                    </Link>
                  </Tab>
                ))}
              </Tabs>
            </CardBody>
          </Card>
          // </Link>
        ))}
      </section>
    </div>
  );
}
